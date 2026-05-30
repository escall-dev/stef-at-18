import { useState, useRef, useEffect } from 'react'
import { Volume2, VolumeX, Maximize, Minimize, Play, Pause } from 'lucide-react'

export default function Hero() {
  const [isMuted, setIsMuted] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showControls, setShowControls] = useState(false)
  
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)

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

  const toggleFullscreen = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!document.fullscreenElement) {
      if (containerRef.current) {
        await containerRef.current.requestFullscreen().catch(err => {
          console.error("Error attempting to enable fullscreen:", err)
        })
      }
    } else {
      if (document.exitFullscreen) {
        await document.exitFullscreen()
      }
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setProgress(videoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
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
    if (isNaN(time)) return "0:00"
    const min = Math.floor(time / 60)
    const sec = Math.floor(time % 60)
    return `${min}:${sec < 10 ? '0' : ''}${sec}`
  }

  const handleMouseMove = () => {
    setShowControls(true)
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false)
    }, 2000)
  }

  const handleMouseLeave = () => {
    setShowControls(false)
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
  }

  return (
    <section className="w-full min-h-[calc(100vh-80px)] px-6 max-w-6xl mx-auto flex justify-center items-center">
      <div className="relative w-full max-w-4xl aspect-video">
        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={`absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center bg-black ${
            isFullscreen 
              ? 'cursor-none' 
              : 'shadow-elegant border-[4px] border-white/60 rounded-3xl'
          }`}
          style={{ cursor: showControls ? 'default' : 'none' }}
        >
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            className="w-full h-full object-cover"
            poster="https://images.pexels.com/photos/1782126/pexels-photo-1782126.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          >
            <source src="/stef-18th-video.mp4" type="video/mp4" />
            <source
              src="https://cdn.coverr.co/videos/coverr-pink-sky-over-the-ocean-8834/1080p.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>

          {/* Controls Container */}
          <div className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 flex flex-col gap-3 z-30 ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            
            {/* Progress Bar & Timestamps */}
            <div className="w-full flex items-center gap-4 px-2">
              <span className="text-white/90 text-sm font-medium tabular-nums shadow-sm">{formatTime(progress)}</span>
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={progress}
                onChange={handleSeek}
                className="w-full h-1.5 bg-white/30 rounded-full appearance-none cursor-pointer accent-primary hover:h-2 transition-all"
              />
              <span className="text-white/90 text-sm font-medium tabular-nums shadow-sm">{formatTime(duration)}</span>
            </div>

            {/* Buttons */}
            <div className="flex justify-between items-center px-2">
              {/* Play/Pause */}
              <button
                onClick={togglePlay}
                className="p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/40 transition-all"
                aria-label={isPlaying ? "Pause video" : "Play video"}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>

              {/* Volume & Fullscreen */}
              <div className="flex gap-3">
                <button
                  onClick={toggleMute}
                  className="p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/40 transition-all"
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>

                <button
                  onClick={toggleFullscreen}
                  className="p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/40 transition-all"
                  aria-label={isFullscreen ? "Exit full screen" : "Enter full screen"}
                >
                  {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
