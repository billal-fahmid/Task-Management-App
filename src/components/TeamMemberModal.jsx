import React from 'react';

const TeamMemberModal = ({ modalData1, setModalData1 }) => {

    const teamMember=modalData1.filter(member=>member.status=== 'accepted');


    return (
        <>
            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div
                    className="fixed inset-0 w-full h-full bg-black opacity-40"
                    onClick={() => setModalData1(null)}
                ></div>
                <div className="flex items-center min-h-screen px-4 py-8">
                    <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                        <div>
                            <h2 className='p-5 text-2xl'>Team Members</h2>
                            <ul className='list-decimal p-10'>
                                {
                                    teamMember?.map((member, index) => <li key={index}>{member.value}</li>)
                                }
                            </ul>
                        </div>
                        <div className="mt-3 ">

                            <button
                                className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                                onClick={() =>
                                    setModalData1(null)
                                }
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TeamMemberModal;