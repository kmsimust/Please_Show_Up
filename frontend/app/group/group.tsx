import "./group.css";
export function Group() {
	const handleCreateGroup = () => { };

	return (
		<>
			<nav className="navbar navbar-expand-lg bg-green-main mb-5">
				<div className="container">
					<a className="navbar-brand" href="#">
						<img src="/image/logo.png" style={{width: 125}} alt="" />
					</a>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarNavAltMarkup"
						aria-controls="navbarNavAltMarkup"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon" />
					</button>
					<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
						<div className="navbar-nav ms-auto">
							<button type="button"
  									className="btn d-flex align-items-center p-0 border-0 bg-transparent">
								<span className="fw-semibold fontGeorgia fs-6 d-flex align-items-center me-3">Profile name </span>
									<img
										src="/image/genki_dama.jpg"
										className="rounded-circle"
										style = {{width: "40px"}}
									/>
							</button>
						</div>
					</div>
				</div>
			</nav>
			<div className="container">
				{/* Create group row */}
				<div className="row mb-3">
					<div className="offset-4 col-4 text-center">
						<button type="button" className="btn btn-lg btn-green text-white rounded-pill w-50 p-3 fw-bold fs-4">Create group</button>
					</div>
				</div>
				<div className="row groupBackground rounded-4">
					<div className="col-12 p-4">
						<div className="row">
							<div className="col-6"><p className="text-start fw-semibold fontGeorgia fs-4">Group 1 name</p></div>
							<div className="col-6"><p className="text-sm-end fw-semibold fontGeorgia fs-4">Members: 5</p></div>
						</div>
						<div className="row">
							<div className="col-6 d-flex">
								<div className="groupImg bg-primary me-2"></div>
								<div className="groupImg bg-warning me-2"></div>
								<div className="groupImg bg-danger me-2"></div>
								<div className="groupImg bg-info me-2"></div>
								<div className="groupImg bg-success me-2"></div>
							</div>
							<div className="col-6 d-flex justify-content-end">
								<span className="fw-semibold fontGeorgia fs-6 d-flex align-items-center me-3">Group creator : </span>
								<div className="groupImg bg-primary me-2"></div>
							</div>
						</div>
					</div>
					
				</div>
			</div>
		</>
		
	);
}
