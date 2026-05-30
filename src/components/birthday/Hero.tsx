import { useState, useRef, useEffect, useCallback } from 'react'
import { Volume2, VolumeX, Maximize, Minimize, Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react'

const VIDEOS = [
  {
    src: '/stef-18th-video.mp4',
    label: "Stef's 18th",
  },
  {
    src: '/stef 18 roses.mp4',
    label: '18 Roses',
  },
  {
    src: '/stef and her papa.mp4',
    label: 'Stef & Papa',
  },
]

interface VideoSlideProps {
  src: string
  label: string
  active: boolean
}

function VideoSlide({ src, label, active }: VideoSlideProps) {
  const [isMuted, setIsMuted] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showControls, setShowControls] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Play/pause based on active state
  useEffect(() => {
    if (!videoRef.current) return
    if (active) {
      videoRef.current.play().catch(() => {})
    } else {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
      setProgress(0)
    }
  }, [active])

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', onFullscreenChange)
    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange)
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current)
    }
  }, [])

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
    }
  }

  const toggleFullscreen = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!document.fullscreenElement) {
      await containerRef.current?.requestFullscreen().catch(console.error)
    } else {
      await document.exitFullscreen()
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value)
    if (videoRef.current) {
      videoRef.current.currentTime = time
      setProgress(time)
    }
  }

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00'
    const min = Math.floor(time / 60)
    const sec = Math.floor(time % 60)
    return `${min}:${sec < 10 ? '0' : ''}${sec}`
  }

  const handleMouseMove = () => {
    setShowControls(true)
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current)
    controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 2000)
  }

  const handleMouseLeave = () => {
    setShowControls(false)
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current)
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center bg-black ${
        isFullscreen ? '' : 'shadow-elegant border-[4px] border-white/60 rounded-3xl'
      }`}
      style={{ cursor: showControls ? 'default' : 'none' }}
    >
      {/* Video label badge */}
      <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 text-white text-sm font-semibold pointer-events-none">
        {label}
      </div>

      <video
        ref={videoRef}
        loop
        muted
        playsInline
        preload="metadata"
        onTimeUpdate={() => {
          if (videoRef.current) setProgress(videoRef.current.currentTime)
        }}
        onLoadedMetadata={() => {
          if (videoRef.current) setDuration(videoRef.current.duration)
        }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className="w-full h-full object-cover"
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Controls */}
      <div
        className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 flex flex-col gap-3 z-30 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Progress */}
        <div className="w-full flex items-center gap-4 px-2">
          <span className="text-white/90 text-sm font-medium tabular-nums">{formatTime(progress)}</span>
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={progress}
            onChange={handleSeek}
            className="w-full h-1.5 bg-white/30 rounded-full appearance-none cursor-pointer accent-primary hover:h-2 transition-all"
          />
          <span className="text-white/90 text-sm font-medium tabular-nums">{formatTime(duration)}</span>
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center px-2">
          <button
            onClick={togglePlay}
            className="p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/40 transition-all"
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>

          <div className="flex gap-3">
            <button
              onClick={toggleMute}
              className="p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/40 transition-all"
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>

            <button
              onClick={toggleFullscreen}
              className="p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/40 transition-all"
              aria-label={isFullscreen ? 'Exit full screen' : 'Enter full screen'}
            >
              {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [direction, setDirection] = useState<'left' | 'right'>('right')

  const goTo = useCallback(
    (index: number, dir: 'left' | 'right') => {
      if (animating) return
      setDirection(dir)
      setAnimating(true)
      setTimeout(() => {
        setCurrent(index)
        setAnimating(false)
      }, 350)
    },
    [animating]
  )

  const prev = () => goTo((current - 1 + VIDEOS.length) % VIDEOS.length, 'left')
  const next = () => goTo((current + 1) % VIDEOS.length, 'right')

  return (
    <section className="w-full min-h-[calc(100vh-80px)] px-6 max-w-6xl mx-auto flex flex-col justify-center items-center gap-6">
      {/* Carousel wrapper */}
      <div className="relative w-full max-w-4xl aspect-video">
        {/* Slide stack */}
        {VIDEOS.map((video, i) => (
          <div
            key={video.src}
            className="absolute inset-0 transition-all duration-350 ease-in-out"
            style={{
              opacity: i === current ? 1 : 0,
              transform:
                i === current
                  ? 'translateX(0) scale(1)'
                  : direction === 'right'
                  ? i === (current - 1 + VIDEOS.length) % VIDEOS.length
                    ? 'translateX(-6%) scale(0.97)'
                    : 'translateX(6%) scale(0.97)'
                  : i === (current + 1) % VIDEOS.length
                  ? 'translateX(6%) scale(0.97)'
                  : 'translateX(-6%) scale(0.97)',
              pointerEvents: i === current ? 'auto' : 'none',
              zIndex: i === current ? 10 : 0,
            }}
          >
            <VideoSlide src={video.src} label={video.label} active={i === current} />
          </div>
        ))}

        {/* Prev arrow */}
        <button
          onClick={prev}
          aria-label="Previous video"
          className="absolute left-[-52px] top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/40 hover:scale-110 transition-all hidden md:flex items-center justify-center"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Next arrow */}
        <button
          onClick={next}
          aria-label="Next video"
          className="absolute right-[-52px] top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/40 hover:scale-110 transition-all hidden md:flex items-center justify-center"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Mobile arrows + dot indicators */}
      <div className="flex items-center gap-5">
        <button
          onClick={prev}
          aria-label="Previous video"
          className="p-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/40 transition-all md:hidden"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex gap-2">
          {VIDEOS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > current ? 'right' : 'left')}
              aria-label={`Go to slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? 'w-6 h-3 bg-primary'
                  : 'w-3 h-3 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          aria-label="Next video"
          className="p-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/40 transition-all md:hidden"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  )
}
