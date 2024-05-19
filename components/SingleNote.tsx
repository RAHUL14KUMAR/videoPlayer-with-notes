"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Button from './Button';

interface SingleNote {
    timestamp: string;
    createdAt: Date;
    content: string;
    image?: string;
    player?: any;
    handleDelete: () => void;
    handleEdit: () => void;
}

const SingleNote: React.FC<SingleNote> = ({ timestamp, createdAt, content, image, player, handleDelete, handleEdit }) => {

    function formatDate (date: Date) {
        const day = new Date().getDate().toString().padStart(2, '0');
        const month = new Date().toLocaleString('en-US', { month: 'short' }); // 'May'
        const year = new Date().getFullYear().toString().slice(-2); // Extract last two digits

        return `${day} ${month} ’${year}`;
    }

    function convertTimestampToSeconds (timestamp: string) {
        const [hours, rest] = timestamp.split(' hrs ');
        const [minutes, seconds] = rest.split(' min ');
        const totalSeconds = parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
        return totalSeconds;
    }

    const handleClick = () => {
        const timestampInSeconds = convertTimestampToSeconds(timestamp);
        console.log("Timestamp in seconds:", timestampInSeconds)
        player.seekTo(timestampInSeconds, true);
    };

    return (
        <div className="note text-gray-600">
            <p className='font-medium'>{formatDate(createdAt)}</p>
            <div className='flex gap-1 hover:cursor-pointer' onClick={handleClick}>
                Timestamp:
                <p className='text-violet-700'>
                    {timestamp}
                </p>
            </div>
            {image && <Image src={image} alt="Note attachment" width={200} height={200} className='py-2' />}
            <p className='border border-gray-200 rounded-md my-4 p-2'>{content}</p>
            <div className='flex justify-end'>
                <Button onClick={handleDelete} text='Delete note' />
                <Button onClick={handleEdit} text='Edit note' />
            </div>
            <hr className="h-[0.5px] my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        </div>
    );
};

export default SingleNote;
