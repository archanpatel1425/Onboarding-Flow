'use client'

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../store/slices/userSlice';
import { RootState } from '../store/store';

const Form4 = ({ nextForm, previousForm, registerHandler }: { nextForm: () => void, previousForm: () => void, registerHandler: (handler: () => boolean) => void }) => {
    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.user);
    const [userData, setuserData] = useState(user)
    const [nevigation_direction, setNevigation_direction] = useState('')

    useEffect(() => {
        registerHandler(handleSubmit);
    }, [userData]);

    const handleSubmit = () => {
        if (!userData.password) {
            alert("password is required");
            return false;
        }
        if (!userData.confirm_password) {
            alert("confirm password is required");
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
                                <label>Password : </label>
                            </td>
                            <td className="p-3">
                                : <input
                                    defaultValue={userData.password}
                                    onChange={(e) => setuserData({ ...userData, ['password']: e.target.value })}
                                    type="password"
                                    required
                                    placeholder="Enter password"
                                    className="border-b border-black focus:outline-none"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="p-3">
                                <label>Confirm Password :</label>
                            </td>
                            <td className="p-3">
                                : <input
                                    type="password"
                                    required
                                    placeholder="Enter confirm password"
                                    defaultValue={userData.confirm_password}
                                    onChange={(e) => setuserData({ ...userData, ['confirm_password']: e.target.value })}
                                    className="border-b border-black focus:outline-none"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="p-3">
                                <label>Final Confirm Password :</label>
                            </td>
                            <td className="p-3">
                                : <input
                                    type="password"
                                    placeholder="Enter final confirm password"
                                    defaultValue={userData.final_confirm_password}
                                    onChange={(e) => setuserData({ ...userData, ['final_confirm_password']: e.target.value })}
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

export default Form4
