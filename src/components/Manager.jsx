import React, { useEffect, useRef, useState } from "react";
import { RxFontRoman } from "react-icons/rx";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArry, setPasswordArry] = useState([]);

  const getPassword = async () => {
    let req = await fetch("http://localhost:3000/");
    let passwords = await req.json();
    console.log(passwords);
    setPasswordArry(passwords);
  };

  useEffect(() => {
    getPassword();
  }, []);
  const copyText = (text) => {
    toast("Copied to clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  const showPassword = () => {
    passwordRef.current.type = "text";
    if (ref.current.src.includes("eyecross.png")) {
      ref.current.src = "eye.png";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "eyecross.png";
      passwordRef.current.type = "text";
    }
  };
  const savePassword = async () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      // 👉 sirf edit ke time delete
      if (form.id) {
        await fetch("http://localhost:3000/", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: form.id }),
        });
      }

      const newPassword = { ...form, id: uuidv4() };

      setPasswordArry([...passwordArry, newPassword]);

      await fetch("http://localhost:3000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPassword),
      });

      setForm({ site: "", username: "", password: "" });

      toast("Password saved successfully ✅");
    } else {
      toast("Error: pass not saved ❌");
    }
  };
  const handleDelete = async (id) => {
    console.log("passwords are delete", id);
    await fetch("http://localhost:3000/", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setPasswordArry(passwordArry.filter((item) => item.id !== id));
    // await fetch("http://localhost:3000/",{ method: "DELETE", headers: { "Content-Type": "application/json" },body:JSON.stringify( {id})})
  };
  const handleEdit = (id) => {
    console.log("passwords are edit", id);
    // setForm({...passwordArry.filter(item=>item.id===id) [0],id:id});
    setForm({ ...passwordArry.filter((i) => i.id === id)[0], id: id });
    setPasswordArry(passwordArry.filter((item) => item.id !== id));
    // localStorage.setItem("passwords", JSON.stringify([...passwordArry, {...form,id:uuidv4()}]));
    // console.log(form);
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="absolute inset-0 -z-10 h-full w-full">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      </div>
      <div className="p-2 myContainer md:p-3 min-h-[84.5vh] w-2/3">
        <h1 className="text-3xl font-bold text-center">
          <span className="text-green-600">&lt;</span>
          Pass
          <span className="text-green-600">OP/&gt;</span>
        </h1>
        <p className="text-lg text-green-600 text-center">
          Your Own Password Manager
        </p>

        <div className=" flex flex-col gap-4 items-center ">
          <input
            onChange={handleChange}
            value={form.site}
            className="border border-green-700 w-full p-4 py-1 text-black rounded-4xl"
            placeholder="Enter Website Url"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex w-full flex-col md:flex-row justify-around gap-8 ">
            <input
              onChange={handleChange}
              value={form.username}
              className="border border-green-700 w-full  p-4 py-1 text-black rounded-4xl"
              placeholder=" Enter Username"
              type="text"
              name="username"
              id="username"
            />
            <div className="relative">
              <input
                onChange={handleChange}
                ref={passwordRef}
                value={form.password}
                className="border border-green-700 w-full  p-4 py-1 text-black rounded-4xl"
                placeholder=" Enter Password"
                type="password"
                name="password"
                id="password"
              />
              <span
                className="absolute right-2 top-1.5 cursor-pointer"
                onClick={showPassword}
              >
                <img ref={ref} width={23} src="eye.png" alt="" />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex justify-center items-center w-fit bg-green-400 px-3 py-1 rounded-full hover:bg-green-300 border border-green-800 "
          >
            <lord-icon
              src="https://cdn.lordicon.com/efxgwrkc.json"
              trigger="hover"
            ></lord-icon>
            Add Password
          </button>
        </div>
        <div className="passwords">
          <h1 className="font-bold text-2xl p-2">Your Passwords</h1>
          {passwordArry.length === 0 && <div>No password show</div>}
          {passwordArry.length !== 0 && (
            <table className="table-auto w-full">
              <thead className="bg-green-800 text-white rounded-md overflow-hidden">
                <tr>
                  <th className="py-1.5">Site</th>
                  <th className="py-1.5">Username</th>
                  <th className="py-1.5">Password</th>
                  <th className="py-1.5">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArry.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-center border border-white py-2 w-30">
                        <div className="flex justify-center items-center gap-1">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <div
                            className="cursor-pointer"
                            onClick={() => {
                              copyText(item.site);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/xuoapdes.json"
                              trigger="hover"
                              style={{
                                width: "23px",
                                height: "23px",
                                paddingTop: "4px",
                              }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="text-center border border-white py-2 w-30">
                        <div className="flex justify-center items-center gap-1">
                          {item.username}
                          <div
                            className="cursor-pointer"
                            onClick={() => {
                              copyText(item.username);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/xuoapdes.json"
                              trigger="hover"
                              style={{
                                width: "23px",
                                height: "23px",
                                paddingTop: "4px",
                              }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="text-center border border-white py-2 w-30">
                        <div className="flex justify-center items-center gap-1">
                          {"*".repeat(item.password.length)}
                          <div
                            className="cursor-pointer"
                            onClick={() => {
                              copyText(item.password);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/xuoapdes.json"
                              trigger="hover"
                              style={{
                                width: "23px",
                                height: "23px",
                                paddingTop: "4px",
                              }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="text-center border border-white py-2 w-30">
                        <div className="flex justify-center items-center gap-1">
                          <span
                            className="cursor-pointer"
                            onClick={(e) => {
                              handleEdit(item.id);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/exymduqj.json"
                              trigger="hover"
                              style={{ width: "25px", height: "25px" }}
                            ></lord-icon>
                          </span>
                          <span
                            className="cursor-pointer"
                            onClick={(e) => {
                              handleDelete(item.id);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/xyfswyxf.json"
                              trigger="hover"
                              style={{ width: "25px", height: "25px" }}
                            ></lord-icon>
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
