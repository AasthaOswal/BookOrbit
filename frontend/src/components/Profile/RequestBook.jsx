import { useState,useEffect } from "react";
import axios from "axios";
import {toast} from "react-toastify"
import { Link, useNavigate } from "react-router-dom";
import SimpleLoader from "../Loader/SimpleLoader";
import { FiAlertTriangle } from "react-icons/fi";


const RequestBook = () => {

  const BACKEND = import.meta.env.VITE_BACKEND_URL;

  const [requestData, setRequestData] = useState({
    title: "",
    author: "",
    language: "",
  });

  const navigate=useNavigate();

  const [isSubmitting,setIsSubmitting]=useState(false);

  useEffect(() => {
      window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setRequestData({ ...requestData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if(requestData.author==="" || requestData.language==="" || requestData.title===""){
      setIsSubmitting(false);
      return toast.error("All fields are required.");
    }
    try {
      const response = await axios.post(
        `${BACKEND}/api/v1/books/requests`,
        requestData,
        { withCredentials: true }
      );
      // console.log(response);
      toast.success(response.data.message);
      navigate("/profile/view-requests");
      setRequestData({
        title: "",
        author: "",
        language: "",
      });
    } catch (err) {
      // console.error(err);
      setIsSubmitting(false);
      return toast.error("Error Occured, Please Check Internet or Try Again Later.");
    }
  };

  return (
    <div className="w-full sm:pr-12 md:px-12">
    <div className="flex flex-col h-fit py-8 w-full  sm:w-9/12 md:w-10/12 lg:w-9/12  bg-zinc-800 border-[0.8px] border-zinc-500 rounded-2xl items-center text-white mx-auto  ">
    
    <div className="text-white  text-justify px-6 sm:px-12">    
      <ul className="list-none text-center  ">
        <li>

          <p className="text-xl font-semibold text-center flex items-center justify-center-safe gap-x-2" >
            <span><FiAlertTriangle className="text-yellow-400 text-center text-2xl flex-grow" /></span>
            <span>Important:</span>
          </p>
        </li>
        <li className="text-justify p-2">
          <span className="text-green-300">Your requested book</span> will appear in the <Link to="/all-books" className="underline hover:text-zinc-100 text-green-300 font-medium">Explore</Link> section within <span className="italic text-green-300 ">48 hours</span>.
        </li>
        <li className="text-justify p-2">
          <span className="text-red-300">If it does not appear</span>, it may have been <span className="text-red-300 italic font-semibold">declined</span> due to some issue.
        </li>
        <li className="text-justify p-2">
          You can <span className="italic text-green-300">resubmit</span> the request after a few days.
        </li>
      </ul>
    </div>
    <form className="w-full"  onSubmit={handleSubmit}>
        <div className="px-6 sm:px-12 py-8 w-full flex flex-col items-center self-center justify-center">
          <div className="flex flex-col mb-4 w-full">
            <label htmlFor="title" className="p-2">Book Title</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter book title"
              className="p-2 rounded-xl outline-none border-[0.8px] border-zinc-500 hover:border-amber-100 focus:border-amber-100"
              value={requestData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col mb-4 w-full">
            <label htmlFor="author" className="p-2">Author Name</label>
            <input
              type="text"
              id="author"
              name="author"
              placeholder="Enter author's name"
              className="p-2 rounded-xl outline-none border-[0.8px] border-zinc-500 hover:border-amber-100 focus:border-amber-100"
              value={requestData.author}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col mb-8  w-full">
            <label htmlFor="language" className="p-2">Language</label>
            <input
              type="text"
              id="language"
              name="language"
              placeholder="Preferred language"
              className="p-2 rounded-xl outline-none border-[0.8px] border-zinc-500 hover:border-amber-100 focus:border-amber-100"
              value={requestData.language}
              onChange={handleChange}
              required
            />
          </div>

        {/* <div className="text-amber-100 italic text-sm  text-center mt-4">
          <ul className="list-disc  space-y-2 text-left inline-block ml-4 ">

            <li>Please allow up to 48 hours for your requested book to appear in the <Link to="/all-books" className="underline hover:text-zinc-100 active:scale-95 active:text-zinc-100">Explore</Link > section. </li>
            <li>If the book does not appear within that time, it may have been declined due to some issue. </li>
            <li>You may try submitting the request again after a few days.</li>
          </ul>
           
        </div> */}

          

       {isSubmitting===false &&  <div className="flex justify-center mt-8">
            <button
              className="px-4 py-2 border-[0.8px] border-white active:scale-95 hover:border-amber-100 hover:text-amber-100 rounded-xl w-fit  cursor-pointer hover:shadow-[0px_0px_8px_rgba(253,230,138,0.5)] active:border-amber-100 active:text-amber-100 active:shadow-[0px_0px_8px_rgba(253,230,138,0.5)] transition-all duration-200  ease-in-out">
              Send Request
            </button>
        </div>}

        {isSubmitting===true && <div className="mx-auto h-auto w-full">
            <p className="text-red-300 text-xl text-center  text-semibold mb-2">Please wait while we are processing the form.</p>
            <SimpleLoader/>
        </div>}



        </div>
      </form>
    </div>
    </div>
  );
};

export default RequestBook;
