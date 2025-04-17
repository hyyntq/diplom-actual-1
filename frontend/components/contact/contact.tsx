import React from 'react'

const Contact = () => {
  return (
    <main className="max-w-xl mx-auto  py-30 ">
      <div className="bg-stone-800 py-12 px-13 text-zinc-300 rounded-xl shadow-xl">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <p className="text-stone-300 text-lg mb-4">
          Have questions or feedback? We d love to hear from you.
        </p>
        <form className="flex flex-col gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <input type="text" id="name" placeholder="Name" className="input" />
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="input"
              placeholder="aaaaa@aaa.aaa"
            />
          </div>
          <div>
            <label htmlFor="message" className="text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              placeholder="message..."
              className="mt-1 w-full border border-gray-300 rounded bg-stone-200 outline-none text-stone-800 text-base px-3 py-2"
            ></textarea>
          </div>
          <button
            type="submit"
            className="flex text-center p-3 rounded-xl cursor-pointer transition  bg-stone-400 text-stone-200 hover:opacity-80 duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </main>
  );
};

export default Contact