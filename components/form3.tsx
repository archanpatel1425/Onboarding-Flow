'use client'

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../store/slices/userSlice';
import { RootState } from '../store/store';

const Form3 = ({ nextForm, previousForm, registerHandler }: { nextForm: () => void, previousForm: () => void, registerHandler: (handler: () => boolean) => void }) => {
    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.user);
    const [userData, setuserData] = useState(user)
    const [nevigation_direction, setNevigation_direction] = useState('')

    useEffect(() => {
        registerHandler(handleSubmit);
    }, [userData]);

    const handleSubmit = () => {
        if (!userData.username) {
            alert("Username is required");
            return false;
        }
        if (!userData.birth_date) {
            alert("Birth date is required");
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
                                <label>Username : </label>
                            </td>
                            <td className="p-3">
                                : <input
                                    defaultValue={userData.username}
                                    onChange={(e) => setuserData({ ...userData, ['username']: e.target.value })}
                                    type="text"
                                    required
                                    placeholder="Enter username"
                                    className="border-b border-black focus:outline-none"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="p-3">
                                <label>Age:</label>
                            </td>
                            <td className="p-3">
                                : <input
                                    type="number"
                                    defaultValue={userData.age}
                                    onChange={(e) => setuserData({ ...userData, ['age']: e.target.value })}
                                    className="border-b border-black focus:outline-none"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="p-3">
                                <label>Birth date :</label>
                            </td>
                            <td className="p-3">
                                : <input
                                    type="date"
                                    required
                                    defaultValue={userData.birth_date}
                                    onChange={(e) => setuserData({ ...userData, ['birth_date']: e.target.value })}
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

export default Form3
