import { useParams } from "react-router-dom";

export default function Details() {
  const { id } = useParams<{ id: string }>();
  return (
    <div>
      <div>Details Page</div>
      <div>Podcast ID: {id}</div>
    </div>
  );
}
