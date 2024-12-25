'use client'

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../store/slices/userSlice';
import { RootState } from '../store/store';

const Form5 = ({ previousForm, registerHandler }: { previousForm: () => void, registerHandler: (handler: () => boolean) => void }) => {
    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.user);
    const [userData, setuserData] = useState(user)
    useEffect(() => {
        registerHandler(handleSubmit);
    }, [userData]);

    const handleSubmit = () => {
        if (!userData.address) {
            alert("Address is required");
            return false;
        }
        if (!userData.pincode) {
            alert("Pincode is required");
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
                    if (handleSubmit()) previousForm()
                }}
            >
                <table>
                    <tbody>
                        <tr>
                            <td className="p-3">
                                <label>Address : </label>
                            </td>
                            <td className="p-3">
                                : <textarea
                                    defaultValue={userData.address}
                                    onChange={(e) => setuserData({ ...userData, ['address']: e.target.value })}
                                    required
                                    placeholder="Enter address"
                                    className="border-b border-black focus:outline-none"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="p-3">
                                <label>Pincode :</label>
                            </td>
                            <td className="p-3">
                                : <input
                                    type="number"
                                    required
                                    placeholder="Enter pincode"
                                    defaultValue={userData.pincode}
                                    onChange={(e) => setuserData({ ...userData, ['pincode']: e.target.value })}
                                    className="border-b border-black focus:outline-none"
                                />
                            </td>
                        </tr>

                        <tr>
                            <td className="p-3">
                                <label>City :</label>
                            </td>
                            <td className="p-3">
                                : <input
                                    type="text"
                                    placeholder="Enter pincode"
                                    defaultValue={userData.area}
                                    onChange={(e) => setuserData({ ...userData, ['area']: e.target.value })}
                                    className="border-b border-black focus:outline-none"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="flex justify-between">
                    <input type="submit" value='Previous' className="p-2 bg-green-500 rounded-xl" />
                </div>
            </form>
        </div>
    )
}

export default Form5
