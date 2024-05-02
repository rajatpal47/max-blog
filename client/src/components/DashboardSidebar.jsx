import { Sidebar } from 'flowbite-react';
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { singoutSucess } from '../redux/user/userslice';

export default function DashboardSidebar() {
  const location = useLocation()
  const dispatch = useDispatch();
  const [tab, setTab] = useState('')
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search])

  const handleSignout = async () => {
    try {
      const res = await fetch(`/api/user/signout`, {
        method: 'POST',
      })
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(singoutSucess());
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
      <Sidebar className=' w-full md:w-56'>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Link to='/dashboard?tab=profile' >
              <Sidebar.Item 
                active={tab==='profile'}
                icon={FaUser} 
                label={'User'} 
                labelColor='dark'
                as='button'
              >
                Profile
              </Sidebar.Item>
            </Link>
            <Sidebar.Item onClick={handleSignout} icon={FaSignOutAlt} className='cursor-pointer'>
              Sign Out
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
  );
}
