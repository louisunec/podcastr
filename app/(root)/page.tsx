"use client";

import PodcastCard from '@/components/PodcastCard'
import React from 'react'
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { getTrendingPodcasts } from '@/convex/podcasts';




const Home = () => {
  const trendingPodcasts = useQuery(api.podcasts.getTrendingPodcasts);

  return (
    <div className='mt-9 flex flex-col gap-9 md:overflow-hidden'>
      <section className='flex flex-col gap-5'>
        <h1 className='text-white-1 font-bold text-20'>
          Trending Podcasts
        </h1>

        <div className='podcast_grid'>
          {trendingPodcasts?.map(({
            _id,
            imageUrl,
            podcastTitle,
            podcastDescription,
          }) => (
            <PodcastCard 
              key={_id}
              title={podcastTitle}
              description={podcastDescription}
              imgUrl={imageUrl ?? ''}
              podcastId={_id}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home