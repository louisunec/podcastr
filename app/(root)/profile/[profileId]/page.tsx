"use client"

import React from 'react'
import Image from 'next/image'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import LoaderSpinner from '@/components/LoaderSpinner'
import ProfileCard from '@/components/ProfileCard'
import EmptyState from '@/components/EmptyState'
import PodcastCard from '@/components/PodcastCard'
import { ProfilePodcastProps } from '@/types'

const Profile = ({ params }: { 
  params: { profileId: string}
}) => {
  const user = useQuery(api.users.getUserById, { 
    clerkId: params.profileId,
  })
  const podcastsData = useQuery(api.podcasts.getPodcastByAuthorId, {
    authorId: params.profileId,
  })

  const mappedPodcastsData: ProfilePodcastProps = {
    podcasts: podcastsData?.podcasts.map(podcast => ({
      ...podcast,
      audioStorageId: podcast.audioStorageId ?? null,
      audioUrl: podcast.audioUrl ?? null,
      imageUrl: podcast.imageUrl ?? null,
      imageStorageId: podcast.imageStorageId ?? null,
      imagePrompt: podcast.imagePrompt ?? null,
    })) || [],
    listeners: podcastsData?.listeners ?? 0,
  };
  
  if (!user || !podcastsData) return <LoaderSpinner />

  return (
    <section className='flex flex-col mt-9'>
        <h1 className='text-20 font-bold text-white-1
        max-md:text-center'>
          Podcaster Profile
        </h1>
        <div className='flex flex-col mt-6 gap-6 max-md:items-center
        md:flex-row'>
          <ProfileCard 
            podcastData={mappedPodcastsData}
            imageUrl={user?.imageUrl!}
            userFirstName={user?.name}
          />
        </div>
        <section className='mt-9 flex flex-col gap-5'>
          <h1 className='text-20 font-bold text-white-1'>
            All Podcasts
          </h1>
          {mappedPodcastsData.podcasts.length > 0 ? (
            <div className='podcast_grid'>
              {mappedPodcastsData.podcasts.slice(0, 4).map((podcast) => (
                <PodcastCard 
                  key={podcast._id}
                  imgUrl={podcast.imageUrl!}
                  title={podcast.podcastTitle!}
                  description={podcast.podcastDescription}
                  podcastId={podcast._id}
                />
              ))}
            </div>
          ): (
            <EmptyState 
              title="You have not created any podcasts"
              buttonLink='/create-podcast'
            />
          )}
        </section>
    </section>
  )
}

export default Profile