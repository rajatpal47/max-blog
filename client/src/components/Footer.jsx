
import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { IoLogoFacebook } from "react-icons/io";
import { IoLogoInstagram } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin, FaGithub } from "react-icons/fa";


export default function FooterCom() {
  return (
  <Footer className=' border border-t-8 border-teal-500 py-4 px-4'>
    <div className=" w-full max-w-7xl mx-auto">
        <div className=" grid w-full justify-between sm:flex md:grid-cols-1">
            <div className=" mt-5">
                <Link to="/" className=" self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white">
                <span className="  py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">Max's</span>
                Blog
                </Link>
            </div>
            <div className=" grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
                <div>
                <Footer.Title title='About' />
                <Footer.LinkGroup col>
                  <Footer.Link
                    href='https://chat-app-koj0.onrender.com'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Chat App
                  </Footer.Link>
                  <Footer.Link
                    href='/about'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Max's Blog
                  </Footer.Link>
                </Footer.LinkGroup>
                </div>
                <div>
                <Footer.Title title='Follow us' />
                <Footer.LinkGroup col>
                  <Footer.Link
                    href='https://github.com/rajatpal47'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Github
                  </Footer.Link>
                  <Footer.Link
                    href='#'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Discord
                  </Footer.Link>
                </Footer.LinkGroup>
                </div>
                <div>
                <Footer.Title title='Legal' />
                <Footer.LinkGroup col>
                  <Footer.Link
                    href='#'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Privacy policy
                  </Footer.Link>
                  <Footer.Link
                    href='#'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Terms &amp; Conditions
                  </Footer.Link>
                </Footer.LinkGroup>
                </div>
            </div>
        </div>
        <Footer.Divider />
        <div className=" w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright 
          href='#'
          by="Max's Blog"
          year={new Date().getFullYear()} 
          />
          <div className=" flex gap-5 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon href='#' icon={IoLogoFacebook} />
            <Footer.Icon href='#' icon={IoLogoInstagram} />
            <Footer.Icon href='#' icon={FaXTwitter} />
            <Footer.Icon href='#' icon={FaLinkedin} />
            <Footer.Icon href='#' icon={FaGithub} />
          </div>
        </div>
    </div>
  </Footer>
)
}
