# user/authentication.py
import jwt
import datetime
from typing import Optional, Tuple

from django.conf import settings
from django.contrib.auth import get_user_model
from rest_framework import exceptions
from rest_framework.authentication import BaseAuthentication, get_authorization_header

User = get_user_model()

# ----- CONFIG (use env or settings) ------------------------------------------
ACCESS_SECRET = getattr(settings, "ACCESS_TOKEN_SECRET", "access_secret")
REFRESH_SECRET = getattr(settings, "REFRESH_TOKEN_SECRET", "refresh_secret")
ACCESS_LIFETIME_SECONDS = getattr(settings, "ACCESS_TOKEN_LIFETIME_SECONDS", 365 * 24 * 4 * 15 * 60)  # 15 minutes => 365 days
REFRESH_LIFETIME_DAYS = getattr(settings, "REFRESH_TOKEN_LIFETIME_DAYS", 7)

# ----- TOKEN HELPERS (fixed algorithms arg) -----------------------------------
def create_access_token(user_id: int) -> str:
    now = datetime.datetime.utcnow()
    payload = {"user_id": user_id, "exp": now + datetime.timedelta(seconds=ACCESS_LIFETIME_SECONDS), "iat": now}
    return jwt.encode(payload, ACCESS_SECRET, algorithm="HS256")

def decode_access_token(token: str) -> int:
    try:
        payload = jwt.decode(token, ACCESS_SECRET, algorithms=["HS256"])
        return payload["user_id"]
    except jwt.ExpiredSignatureError:
        raise exceptions.AuthenticationFailed("Access token expired.")
    except jwt.InvalidTokenError:
        raise exceptions.AuthenticationFailed("Invalid access token.")

def create_refresh_token(user_id: int) -> str:
    now = datetime.datetime.utcnow()
    payload = {"user_id": user_id, "exp": now + datetime.timedelta(days=REFRESH_LIFETIME_DAYS), "iat": now}
    return jwt.encode(payload, REFRESH_SECRET, algorithm="HS256")

def decode_refresh_token(token: str) -> int:
    try:
        payload = jwt.decode(token, REFRESH_SECRET, algorithms=["HS256"])
        return payload["user_id"]
    except jwt.ExpiredSignatureError:
        raise exceptions.AuthenticationFailed("Refresh token expired.")
    except jwt.InvalidTokenError:
        raise exceptions.AuthenticationFailed("Invalid refresh token.")

# ----- DRF AUTH CLASS ---------------------------------------------------------
class JWTAuthentication(BaseAuthentication):
    """
    Accepts: Authorization: Bearer <access_token>
    Sets: request.user for authenticated views.
    """
    keyword = b"bearer"

    def authenticate(self, request) -> Optional[Tuple[User, None]]:
        auth = get_authorization_header(request).split()
        if not auth:
            return None
        if auth[0].lower() != self.keyword:
            return None
        if len(auth) == 1:
            raise exceptions.AuthenticationFailed("Invalid Authorization header: token missing.")
        if len(auth) > 2:
            raise exceptions.AuthenticationFailed("Invalid Authorization header: token contains spaces.")

        token = auth[1].decode("utf-8")
        user_id = decode_access_token(token)

        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            raise exceptions.AuthenticationFailed("User not found.")

        return (user, None)

    def authenticate_header(self, request) -> str:
        # Helps DRF set WWW-Authenticate properly for 401s
        return "Bearer"