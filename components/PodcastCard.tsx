import { PodcastCardProps } from '@/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'

const PodcastCard = ({ podcastId, title, imgUrl, description 
}:PodcastCardProps) => {
    const router = useRouter()

    const handleViews = () => {
        // increase views

        router.push(`/podcasts/${podcastId}`, {
            scroll: true
        })
    }
  return (
    <div className='cursor-point' onClick={handleViews}>
        <figure className='flex flex-col gap-2'>
            <Image 
                src={imgUrl}
                alt={title}
                width={174}
                height={174}
                className='aspect-square h-fit w-full rounded-xl
                2xl:size-[200px]'
            />
            <div className='flex flex-col'>
                <h1 className='text-16 truncate font-bold text-white-1'>
                    {title}
                </h1>
                <h2 className='text-white-4 text-12 truncate font-normal capitalize'>
                    {description}
                </h2>
            </div>
        </figure>
    </div>
  )
}

export default PodcastCard