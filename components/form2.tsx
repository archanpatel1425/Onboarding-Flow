'use client'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../store/slices/userSlice';
import { RootState } from '../store/store';

const Form2 = ({ nextForm, previousForm, registerHandler }: { nextForm: () => void, previousForm: () => void, registerHandler: (handler: () => boolean) => void }) => {
    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.user);
    const [userData, setuserData] = useState(user)
    const [nevigation_direction, setNevigation_direction] = useState('')

    useEffect(() => {
        registerHandler(handleSubmit);
    }, [userData]);

    const handleSubmit = () => {
        if (!userData.email) {
            alert("email is required");
            return false;
        }
        if (!userData.phone_no) {
            alert("Phone no. is required");
            return false;
        }
        dispatch(updateUser(userData));
        return true;
    };

    return (
        <div>
            <form
                className="border-2 border-blue-500 rounded-xl p-6 bg-white shadow-md"
                onSubmit={(e) => {
                    e.preventDefault();
                    if (handleSubmit()) {
                        if (nevigation_direction === 'next') {
                            nextForm()
                        }
                        else {
                            previousForm()
                        }
                    }
                }}
            >
                <table>
                    <tbody>
                        <tr>
                            <td className="p-3">
                                <label>Email_id : </label>
                            </td>
                            <td className="p-3">
                                : <input
                                    defaultValue={userData.email}
                                    onChange={(e) => setuserData({ ...userData, ['email']: e.target.value })}
                                    type="email"
                                    required
                                    placeholder="Enter email"
                                    className="border-b border-black focus:outline-none"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="p-3">
                                <label>whatsapp no. : </label>
                            </td>
                            <td className="p-3">
                                : <input
                                    defaultValue={userData.whatsapp_no}
                                    onChange={(e) => setuserData({ ...userData, ['whatsapp_no']: e.target.value })}
                                    type="number"
                                    placeholder="Enter whatsapp no."
                                    className="border-b border-black focus:outline-none"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="p-3">
                                <label>Phone no. :</label>
                            </td>
                            <td className="p-3">
                                : <input
                                    type="number"
                                    required
                                    defaultValue={userData.phone_no}
                                    onChange={(e) => setuserData({ ...userData, ['phone_no']: e.target.value })}
                                    placeholder="Enter phone no."
                                    className="border-b border-black focus:outline-none"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="flex justify-between">
                    <input type="submit" value='Previous' className="p-2 bg-green-500 rounded-xl" onClick={() => setNevigation_direction('previous')} />
                    <input type="submit" value='Next' className="p-2 bg-green-500 rounded-xl" onClick={() => setNevigation_direction('next')} />
                </div>
            </form>
        </div>
    )
}

export default Form2
