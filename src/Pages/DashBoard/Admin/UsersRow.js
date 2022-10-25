import React from 'react';
import { toast } from 'react-toastify';

const UsersRow = ({ user, index, refetch }) => {
    const handleAdmin = (email) => {
        fetch(`https://sleepy-hollows-57490.herokuapp.com/users/admin/${email}`, {
            method: "PUT",
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    refetch();
                    toast.success(`Successfully made an Admin`);
                }

            })
    }
    const handleRemove = (id) => {
        fetch(`https://sleepy-hollows-57490.herokuapp.com/users/${id}`, {
            method: "PUT",
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
    }
    return (
        <tr>
            <th>{index + 1}</th>
            <td>{user.email}</td>
            <td>
                {
                    user.role !== 'admin' && <button
                        onClick={() => handleAdmin(user.email)}
                        className='bg-gray-800 text-white px-4 py-[5px] rounded-lg'>
                        Make Admin
                    </button>
                }
            </td>
            <td>
                <label
                    htmlFor='removeUserModal'
                    onClick={handleRemove(user._id)}
                    className="bg-gray-800 text-white px-4 py-[5px] rounded-lg">
                    Remove User
                </label>
            </td>
        </tr>
    );
};

export default UsersRow;