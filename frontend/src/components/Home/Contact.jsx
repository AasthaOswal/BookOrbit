import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from "react-toastify";
import { MdLocalPhone } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { HiOutlineCheck } from "react-icons/hi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import SimpleLoader from '../Loader/SimpleLoader';

const Contact = () => {
  const form = useRef();
  const [loading,setLoading]=useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [isSubmitting,setIsSubmitting]=useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const sendEmail = (e) => {
    
    e.preventDefault();
    setIsSubmitting(true);

    if (formData.name.trim() === "" ||formData.email.trim() === "" ||formData.message.trim() === "") {
      setIsSubmitting(false);
      return toast.error("All fields are compulsory.");
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;


    emailjs
      .sendForm(serviceId, templateId, form.current, {
        publicKey: publicKey,
      })
      .then(
        () => {
          setIsSubmitting(false);
          setFormData({
            name: "",
            email: "",
            message: ""
          });
          return toast.success("Message sent successfully!");
        },
        (error) => {
          setIsSubmitting(false);
          return toast.error("Failed to send message. Please Check Internet OR Try again later.");
        },
      );
  };

  return (
    <><h2 className="text-center text-2xl font-bold mt-16 mb-12 text-white">Contact Us</h2>
   
    <div className="w-full h-auto lg:h-[600px]  bg-zinc-900 text-white gap-12  flex flex-col lg:flex-row items-center justify-around">
    
      <div className='contact-details py-8 px-8  h-full  w-full sm:w-10/12 lg:w-6/12 2xl:w-5/12 flex flex-col justify-around gap-y-4   bg-zinc-800 border-[0.8px] border-zinc-500 rounded-2xl'>

        <p className='flex flex-col items-center  justify-center gap-x-2  w-full'> 
          <span className='flex justify-center gap-x-2 text-amber-100 font-semibold items-center text-xl' ><MdLocalPhone/> Call</span> 
          <span  className='text-center'>1234567890</span>
        </p>
        <p className='flex flex-col items-center  justify-center gap-x-2  w-full'> 
          <span className='flex justify-center gap-x-2 text-amber-100 font-semibold  items-center text-xl' ><MdOutlineEmail/> Email</span> 
          <span className='text-center'>admin@gmail.com</span>
        </p>
        <p className='flex flex-col items-center  justify-center gap-x-2 w-full'>
          <span className='flex justify-center gap-x-2 text-amber-100 font-semibold  items-center text-xl' ><HiOutlineLocationMarker />Address </span>
          <span className='text-center w-10/12'> Shop No.5, Phoolwati Complex, Chandra Road, Near Hanuman Mandir, MIDC, Dombivali-East</span>
        </p>
        <p className='flex items-center justify-center gap-x-2  text-semibold italic  text-green-300 w-full'>
          <span className='self-start  mt-1 text-xl'><HiOutlineCheck/></span>
          <span className='text-center'>We usually reply within 24 hours.</span>
        </p>

        <p className='text-red-300 text-center '>
          *Note: This is a student project. Contact details provided are placeholders.
        </p>
        


      </div>


      <div className="flex flex-col  px-8 py-8 w-full sm:w-10/12 lg:w-6/12 2xl:w-5/12 bg-zinc-800 border-[0.8px] border-zinc-500 rounded-xl items-center h-full">
        <form ref={form}  className=" w-11/12 flex flex-col justify-around h-full ">
          <div className="flex flex-col ">
            <label htmlFor="name" className="p-2">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your name"
              className="p-2 rounded-xl outline-none border-[0.8px] border-zinc-500 hover:border-amber-100 focus:border-amber-100"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col ">
            <label htmlFor="email" className="p-2">Your Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your email"
              className="p-2 rounded-xl outline-none border-[0.8px] border-zinc-500 hover:border-amber-100 focus:border-amber-100"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="message" className="p-2">Your Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              placeholder="Type your message..."
              className="p-2 rounded-xl outline-none border-[0.8px] border-zinc-500 hover:border-amber-100 focus:border-amber-100"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          {isSubmitting===false && <div className="flex justify-center mt-8">
            <button
              
              className="px-4 py-2 border-amber-100 border-[0.8px] rounded-2xl active:scale-95 hover:shadow-[0px_0px_8px_rgba(253,230,138,0.5)] active:shadow-[0px_0px_8px_rgba(253,230,138,0.5)] cursor-pointer transition-all duration-200 ease-in-out text-amber-100" onClick={sendEmail}
            >
              Send Message
            </button>
          </div>}

          {isSubmitting===true && <div className="mx-auto h-auto w-full mt-1">
              <p className="text-red-300 text-xl text-center  text-semibold ">Please wait while we are processing the form.</p>
              <SimpleLoader/>
          </div>}
          

        </form>
      </div>
      
    </div>
    
    </>
  );
};

export default Contact;
