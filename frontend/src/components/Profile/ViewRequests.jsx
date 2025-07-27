import { useEffect, useState } from "react";
import axios from "axios";
import SimpleLoader from "../Loader/SimpleLoader";
import { CiSquarePlus } from "react-icons/ci";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";



const ViewRequests = ({allRequests}) => {

	const showAll = allRequests === "true";

	const BACKEND = import.meta.env.VITE_BACKEND_URL;

	const [requests, setRequests] = useState(null);
	const role = localStorage.getItem("role");

	const navigate=useNavigate();

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "auto" });
	}, []);
	
	
	
  	const getRequests = async () => {
		try {
			const response = await axios.get(`${BACKEND}/api/v1/books/requests`,{ withCredentials: true });

			// console.log(" allRequests:", allRequests, " type:", typeof allRequests);

			if (role === "admin") {
				if (allRequests) {
					// console.log("admin + allRequests → SHOW ALL");
					setRequests(response.data.bookRequestData);
				} else {
					const onlyAdmin = response.data.bookRequestData.filter((r) => r.userId?.role === "admin");
					// console.log(" admin + !allRequests → SHOW ADMIN‑ONLY:", onlyAdmin.length);
					setRequests(onlyAdmin);
				}
			} else {
					// console.log(" non‑admin → SHOW ALL");
					setRequests(response.data.bookRequestData);
			}
		} catch (err) {
			// console.error(err);
			toast.error("Error fetching requests, please try again.");
		}
  	};

	useEffect(() => {
		
		getRequests();
	}, []);

	return (
		<div className="text-white w-full  sm:pr-12 md:px-12">
			<h1 className="text-2xl  mb-8 mx-auto text-center">
				Requested Books
			</h1>
			

			<div className="flex flex-wrap w-full gap-4 items-center ">
				{!requests && (
					<div className="w-full h-screen flex items-center justify-center">
						<SimpleLoader />
					</div>
				)}

				{requests && requests.length === 0 && (
					<div className="flex flex-col sm:flex-row items-center justify-center w-full text-center text-white gap-4 py-10">

						<CiSquarePlus className="w-28 h-28 text-amber-100" />

						<div className="w-fit h-auto flex flex-col justify-center items-center gap-y-4">
							<h2 className="text-xl text-amber-100 font-semibold">No Requests Yet</h2>
							<p className="text-sm text-white italic">You haven't made any book requests yet.</p>

							<button
								className="flex items-center justify-center gap-x-2 px-4 py-2 border-zinc-500 hover:bg-zinc-800 active:bg-zinc-800 border-[0.8px] hover:border-amber-100 active:border-amber-100 rounded-2xl active:scale-95 active:text-amber-100 hover:text-amber-100 cursor-pointer transition-all duration-300 ease-in-out"
								onClick={() => navigate("/profile/request-book")}
							>
								<span>Make a Request</span>
								<span className="text-xl">
								<FaArrowRightLong />
								</span>
							</button>
						</div>

					</div>
				)}


				{requests &&
					requests.map((item, i) => (
						<div
							key={i}
							className="w-fit flex-grow flex-shrink text-center bg-zinc-800 border-[0.8px] border-zinc-500 hover:border-amber-100 rounded-2xl p-6"
						>
							<div className="flex flex-col flex-grow flex-shrink gap-3 ">
								<p>
									<span className="font-medium ">Title:</span>
									<span className="text-amber-100 font-semibold">
										{" "}
										{item.title}
									</span>
								</p>
								<p className="italic">
									<span className="font-medium ">Author:</span> {item.author}
								</p>
								<p>
									<span className="font-medium ">Language:</span>{" "}
									{item.language}
								</p>
								{role === "admin" && item.userId && (
									<p className="text-sm ">
										Requested By:{" "}
										<span className="text-amber-100">
											@{item.userId.username}
										</span>
									</p>
								)}
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default ViewRequests;
