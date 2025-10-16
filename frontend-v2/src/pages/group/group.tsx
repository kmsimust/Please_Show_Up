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
          <div className="groupCard rounded-4 p-3 mb-4">
            <div className="d-flex justify-content-between align-items-center">
              <p className="fw-bold fontGeorgia fs-4 m-0">isp group work</p>
              <p className="fw-bold fontGeorgia fs-5 m-0">members: 5</p>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-3">
              <div className="d-flex">
                <div className="groupImg bg-dark me-2"></div>
                <div className="groupImg bg-success me-2"></div>
                <div className="groupImg bg-light me-2"></div>
                <div className="groupImg bg-info me-2"></div>
                <div className="groupImg bg-danger me-2"></div>
              </div>
              <div className="d-flex align-items-center">
                <span className="fw-semibold fontGeorgia fs-6 me-2">
                  group creater:
                </span>
                <div className="groupImg bg-dark"></div>
              </div>
            </div>
          </div>

          {/* Another example */}
          <div className="groupCard rounded-4 p-3">
            <div className="d-flex justify-content-between align-items-center">
              <p className="fw-bold fontGeorgia fs-4 m-0">our friend gang</p>
              <p className="fw-bold fontGeorgia fs-5 m-0">members: 4</p>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-3">
              <div className="d-flex">
                <div className="groupImg bg-success me-2"></div>
                <div className="groupImg bg-light me-2"></div>
                <div className="groupImg bg-dark me-2"></div>
                <div className="groupImg bg-info me-2"></div>
              </div>
              <div className="d-flex align-items-center">
                <span className="fw-semibold fontGeorgia fs-6 me-2">
                  group creater:
                </span>
                <div className="groupImg bg-success"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
