import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Loader from '../Shared/Loader';
import UploadModal from './MyProfile/UploadModal';
import UpdateModal from './MyProfile/UpdateModal';

const MyProfile = () => {
    const [user] = useAuthState(auth);
    const [editInfo, setEditInfo] = useState([]);
    const [update, setUpdate] = useState([]);
    const email = user?.email;

    const { data: userInfo, isLoading, refetch } = useQuery('userInfo', () =>
        fetch(`https://sleepy-hollows-57490.herokuapp.com/userInfo?email=${email}`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => res.json())

    )
    if (isLoading) {
        return <Loader></Loader>
    }

    return (
        <div className='mt-16 flex justify-center'>
            <div className=" w-96 shadow-xl p-4">
                <div className="flex gap-2">
                    <div className="avatar online placeholder">
                        <div className="bg-neutral-focus text-neutral-content rounded-full w-16">
                            <span className="text-xl">{user.displayName.slice(0, 1)}</span>
                        </div>
                    </div>
                    <div className='text-left mt-2'>
                        <h2 className=" text-lg font-bold">{user.displayName}</h2>
                        <p className='text-sm font-semibold'>{user?.email}</p>
                    </div>
                </div>

                <div className='text-left mt-10 grid grid-cols-1 gap-2'>
                    <p>Education : {userInfo[0]?.education}</p>
                    <p>Location : {userInfo[0]?.location}</p>
                    <p>Phone Number : {userInfo[0]?.number}</p>
                    <p>Linkedin : {userInfo[0]?.linkedin}</p>
                </div>
                <div className='flex gap-2 justify-end mt-5'>
                    <label
                        htmlFor="uploadModal"
                        className="bg-slate-700 cursor-pointer text-white px-2 py-[4px] rounded">Upload Information</label>
                    <label
                        htmlFor="updateModal"
                        className="bg-slate-700 cursor-pointer text-white px-2 py-[4px] rounded">Update Profile</label>
                </div>
            </div>
            {
                editInfo && <UploadModal
                    setEditInfo={setEditInfo}
                ></UploadModal>
            }

            {
                update && <UpdateModal
                    setUpdate={setUpdate}
                    _id={userInfo[0]?._id}
                    refetch={refetch}
                ></UpdateModal>
            }
        </div>
    );
};

export default MyProfile;