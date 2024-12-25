'use client'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../store/slices/userSlice';
import { RootState } from '../store/store';

const Form1 = ({ nextForm, registerHandler }: { nextForm: () => void, registerHandler: (handler: () => boolean) => void }) => {
    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.user);
    const [userData, setuserData] = useState(user)

    useEffect(() => {
        registerHandler(handleSubmit);
    }, [userData]);

    const handleSubmit = () => {
        if (!userData.first_name) {
            alert("First name is required");
            return false;
        }
        if (!userData.last_name) {
            alert("Last name is required");
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
                    if (handleSubmit()) nextForm();
                }}
            >
                <table>
                    <tbody>
                        <tr>
                            <td className="p-3">
                                <label>First Name : </label>
                            </td>
                            <td className="p-3">
                                : <input
                                    defaultValue={userData.first_name}
                                    onChange={(e) => setuserData({ ...userData, ['first_name']: e.target.value })}
                                    type="text"
                                    required
                                    placeholder="Enter first name"
                                    className="border-b border-black focus:outline-none"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="p-3">
                                <label>Middle Name : </label>
                            </td>
                            <td className="p-3">
                                : <input
                                    defaultValue={userData.middle_name}
                                    onChange={(e) => setuserData({ ...userData, ['middle_name']: e.target.value })}
                                    type="text"
                                    placeholder="Enter first name"
                                    className="border-b border-black focus:outline-none"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="p-3">
                                <label>Last Name :</label>
                            </td>
                            <td className="p-3">
                                : <input
                                    type="text"
                                    required
                                    defaultValue={userData.last_name}
                                    onChange={(e) => setuserData({ ...userData, ['last_name']: e.target.value })}
                                    placeholder="Enter last name"
                                    className="border-b border-black focus:outline-none"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="flex justify-between">
                    <input type="submit" value='Next' className="p-2 bg-green-500 rounded-xl" />
                </div>

            </form>
        </div>
    )

}

export default Form1