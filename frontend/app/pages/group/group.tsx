import "./group.css";
import NavBar from "../../components/navbar";
import Sidebar from "../../components/sidebar";

export function GroupPage() {
	const handleCreateGroup = () => {};

	return (
		<>
		<NavBar />
		<div className="d-flex">
			{/* Sidebar */}
			<Sidebar />

			{/* Main content */}
			<div className="flex-grow-1 p-4">
			<div className="mb-4">
				<button
				onClick={handleCreateGroup}
				type="button"
				className="btn btn-green text-white fw-bold fs-5 px-4 py-2"
				>
				Create group
				</button>
			</div>

			{/* Example group card */}
			<div className="groupCard rounded-4 p-4 mb-4">
				<div className="d-flex justify-content-end">
				<p className="fw-bold fs-2">isp group work</p>
				</div>
				<div className="d-flex justify-content-end pt-4">
				<div className="d-flex">
					<div className="groupImg bg-dark me-2"></div>
					<div className="groupImg bg-success me-2"></div>
					<div className="groupImg bg-light me-2"></div>
					<div className="groupImg bg-info me-2"></div>
					<div className="groupImg bg-danger me-2"></div>
				</div>
				</div>
			</div>

			{/* Another example */}
			<div className="groupCard rounded-4 p-3">
				<div className="d-flex justify-content-end">
				<p className="fw-bold fs-2">The boys</p>
				</div>
				<div className="d-flex justify-content-end pt-4">
				<div className="d-flex">
					<div className="groupImg bg-success me-2"></div>
					<div className="groupImg bg-light me-2"></div>
					<div className="groupImg bg-dark me-2"></div>
					<div className="groupImg bg-info me-2"></div>
				</div>
				</div>
			</div>
			</div>
		</div>
		</>
	);
}
