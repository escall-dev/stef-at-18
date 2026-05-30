import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

const rsvpSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name is required' }),
  contactNumber: z.string().min(5, { message: 'Contact number is required' }),
  attendance: z.enum(['accepts', 'declines'], { required_error: 'Please select attendance' }),
  guests: z.coerce.number().min(0).max(10, { message: 'Max 10 guests' }),
  dietary: z.string().optional()
})

type RsvpFormValues = z.infer<typeof rsvpSchema>

export default function RsvpForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<RsvpFormValues>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      guests: 0,
    }
  })

  const onSubmit = async (data: RsvpFormValues) => {
    // TODO: Wire to Lovable Cloud or backend later
    console.log('RSVP Submission Payload:', data)
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    toast.success("RSVP Submitted Successfully!", {
      description: "Thank you! Your response has been recorded.",
      style: {
        background: '#fffcfb',
        border: '1px solid rgba(183, 110, 121, 0.4)',
        color: '#4a4a4a'
      }
    })
    
    reset()
  }

  return (
    <section id="rsvp" className="py-24 px-6 md:px-12 max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass-panel p-8 md:p-12 rounded-3xl"
      >
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">
            RSVP
          </h2>
          <p className="text-gray-600 font-sans font-light">
            Kindly respond by November 15, 2026
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                {...register('fullName')}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all bg-white/50"
                placeholder="Jane Doe"
              />
              {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Contact Number</label>
              <input
                {...register('contactNumber')}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all bg-white/50"
                placeholder="+63 912 345 6789"
              />
              {errors.contactNumber && <p className="text-red-500 text-sm mt-1">{errors.contactNumber.message}</p>}
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">Attendance</label>
            <div className="flex flex-col sm:flex-row gap-4">
              <label className="flex-1 flex items-center justify-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-white/60 transition-colors has-[:checked]:border-primary has-[:checked]:bg-secondary/20">
                <input type="radio" value="accepts" {...register('attendance')} className="w-4 h-4 text-primary focus:ring-primary" />
                <span className="font-medium text-gray-700">Joyfully accepts</span>
              </label>
              <label className="flex-1 flex items-center justify-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-white/60 transition-colors has-[:checked]:border-primary has-[:checked]:bg-secondary/20">
                <input type="radio" value="declines" {...register('attendance')} className="w-4 h-4 text-primary focus:ring-primary" />
                <span className="font-medium text-gray-700">Regretfully declines</span>
              </label>
            </div>
            {errors.attendance && <p className="text-red-500 text-sm mt-1">{errors.attendance.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Number of Additional Guests</label>
            <input
              type="number"
              {...register('guests')}
              className="w-full md:w-1/2 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all bg-white/50"
              min="0"
            />
            {errors.guests && <p className="text-red-500 text-sm mt-1">{errors.guests.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Dietary Preferences / Restrictions</label>
            <textarea
              {...register('dietary')}
              rows={3}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all bg-white/50 resize-none"
              placeholder="Any allergies or dietary requirements?"
            />
          </div>

          <div className="pt-4 text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary text-white px-12 py-4 rounded-full font-sans tracking-wide hover:bg-[#a65d68] hover:shadow-lg transition-all duration-300 shadow-soft disabled:opacity-70 w-full sm:w-auto"
            >
              {isSubmitting ? 'Sending...' : 'Send RSVP'}
            </button>
          </div>
        </form>
      </motion.div>
    </section>
  )
}
