import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useRecoilState } from 'recoil';
import Layout from "./features/components/common/Layout";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import { useState, useEffect } from "react";
import useFetchUser from "./features/apis/auth/use-fetch-user";
import Loading from "./features/components/common/Loading";
import { authTokenLocalStorage } from "./features/utils/local-storage";
import { userState } from "./features/states/user-state";
import PostListPage from "./pages/post/PostListPage";
import PostDetailPage from "./pages/post/PostDetailPage";

function App() {
  const [initialized, setInitialized] = useState(false);
  const { refetch: refetchUser, data } = useFetchUser();
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    const token = authTokenLocalStorage.get();

    if (!token) {
      setInitialized(true);
    } else {
      refetchUser().finally(() => {
        setInitialized(true);
      });
    }
  }, [refetchUser]);
  


  useEffect(() => {
    // Update Recoil user state when data changes
    if (data && 'success' in data && data.success && 'user' in data) {
      // Case: Success with user data
      setUser(data.user);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, refetchUser, setUser]);

  if (!initialized) {
    return <Loading />;
  }

  const isAuthenticated = data && 'success' in data && data.success;

  if (!isAuthenticated) {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route element={<Layout />}>
            <Route path="/" element={<PostListPage />} />
            <Route path="/post" element={<PostListPage />} />
            <Route
              element={<PostDetailPage />}
              path="post/:postId"
              loader={async ({ params }) => {
                console.log('params.postId: ', params.postId);
                return true;
                // return fetch(
                //   `/fake/api/teams/${params.postId}.json`
                // );
              }}
              action={async ({ request }) => {
                console.log('request: ', request)
                return true;
                // return updateFakeTeam(await request.formData());
              }}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
