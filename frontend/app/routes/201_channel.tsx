import { Form, redirect, useFetcher } from "react-router";
import type { Route } from "./+types/201_channel"

export async function clientLoader({ params }: Route.LoaderArgs) {
  const channelId = params.channelId;
  const res = await fetch(`http://localhost:5173/channel/${channelId}`)
  return await res.json;
}

// export async function loader({ params }: Route.LoaderArgs) {
//   const product = await db.getproduct(params.id);
//   return product;
// }

export async function clientAction({ params }: Route.ClientActionArgs) {
  try {
    await fetch(`http://localhost:5173/channel/${params.channelId}`,
      {method: "DELETE",}
    );
    return { isDeleted: true };
  } catch (err) {
    return { isDeleted: false };
  }
}


export default function Channel({ loaderData }: Route.ComponentProps) {
  const fetcher = useFetcher();

  const isDeleted = fetcher.data?.isDeleted;

  return (
    <div>
      {!isDeleted && (
        <>
          {/* // <p> Channel Id: {loaderData.name}</p> */}
          <p> Channel Id: 3</p>
        </>
      )}
      <Form method="delete">
        <button type="submit"> Delete </button>
      </Form>
    </div>
  );
}
