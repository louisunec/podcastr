"use client"

import { PodcastDetailPlayerProps } from '@/types'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Button } from './ui/button'
import { useState } from 'react'
import { useToast } from './ui/use-toast'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useAudio } from '@/providers/AudioProvider'
import LoaderSpinner from './LoaderSpinner'

const PodcastDetailPlayer = ({
    audioUrl,
    isOwner,
    podcastTitle,
    author,
    imageUrl,
    podcastId,
    imageStorageId,
    audioStorageId,
    authorImageUrl,
    authorId,
}: PodcastDetailPlayerProps) => {
    const router = useRouter()
    const { toast } = useToast()
    const [isDeleting, setIsDeleting] = useState(false)
    const { setAudio } = useAudio()
    const deletePodcast = useMutation(api.podcasts.deletePodcast)

    const handleDelete = async () => {
        try {
            await deletePodcast({ podcastId, imageStorageId, audioStorageId});
            toast({ title: "Podcast deleted successfully"});
            router.push('/')
        } catch (error) {
            console.error("Error deleting podcast", error);
            toast({
                title: "Error deleting podcast",
                variant: "destructive",
            })
        }
    }

    const handlePlay = () => {
        setAudio({
            title: podcastTitle,
            audioUrl,
            imageUrl,
            author,
            podcastId,
        })
    }

    if (!imageUrl || !authorImageUrl) return <LoaderSpinner />
  return (
    <div className='flex mt-6 w-full justify-between max-md:justify-center'>
        <div className='flex flex-col gap-8 max-md:items-center md:flex-row'>
            <Image 
                src={imageUrl}
                alt="podcast image"
                width={250}
                height={250}
                className='aspect-square rounded-lg'
            />
            <div className='flex w-full flex-col gap-5 max-md:items-center md:gap-9'>
                <article className='flex flex-col gap-2 max-md:items-center'>
                    <h1 className='text-32 font-extrabold text-white-1 tracking-[-0.32px]'>
                        {podcastTitle}
                    </h1>
                    <figure
                        className='flex cursor-pointer items-center gap-2'
                        onClick={() => {router.push(`/profile/${authorId}`)}}
                    >
                        <Image 
                            src={authorImageUrl}
                            alt="author image"
                            width={30}
                            height={30}
                            className='size-[30px] rounded-full object-cover'
                        />
                        <h2 className='text-16 font-normal text-white-3'>{author}</h2>
                    </figure>
                </article>

                <Button
                    onClick={handlePlay}
                    className='text-16 w-full max-w-[250px] bg-orange-1 font-extrabold
                    text-white-1'
                >
                    <Image 
                        src="/icons/Play.svg"
                        alt="play"
                        width={20}
                        height={20}
                    />{' '}
                    &nbsp; Play Podcast
                </Button>
            </div>
        </div>
        {isOwner && (
            <div className='relative mt-2'>
                <Image 
                    src="/icons/three-dots.svg"
                    alt="three dots"
                    width={20}
                    height={30}
                    className='cursor-pointer'
                    onClick={() => setIsDeleting((prev) => !prev)}
                />
                {isDeleting && (
                    <div 
                        className='absolute -left-32 -top-2 z-10 flex w-32 cursor-pointer
                        justify-center gap-2 rounded-md bg-black-6 py-1.5 hover:bg-black-2'
                        onClick={handleDelete}
                    >
                        <Image 
                            src="/icons/delete.svg"
                            alt="delete"
                            width={16}
                            height={16}
                        />
                        <h2 className='text-16 text-white-1 font-normal'>Delete</h2>
                    </div>
                )}
            </div>
        )}
    </div>
  )
}

export default PodcastDetailPlayer