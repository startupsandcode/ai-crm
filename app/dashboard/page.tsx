"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/utils/supabaseClient"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"

export default function Dashboard() {
	const [contacts, setContacts] = useState<any[]>([])
	const [campaigns, setCampaigns] = useState<any[]>([])
	const [loading, setLoading] = useState(true)
	const [onboarding, setOnboarding] = useState(false)
	const [onboardingDismissed, setOnboardingDismissed] = useState(false)

	const searchParams = useSearchParams()
	const router = useRouter()
	
	const fetchData = async () => {
		const { data: contactData } = await supabase.from("contacts").select("*")
		const { data: campaignData } = await supabase.from("campaigns").select("*")

		setContacts(contactData || [])
		setCampaigns(campaignData || [])
		setLoading(false)
	}

	const handleSkipOnboarding = () => {
		setOnboarding(false)
		setOnboardingDismissed(true)
		// Remove onboarding parameter from URL
		router.replace('/dashboard')
	}

	const handleStepAction = (step: any) => {
		if (step.isExternal) {
			// Navigate to external page
			router.push(step.href)
		} else {
			// For "View Dashboard", just close the onboarding
			handleSkipOnboarding()
		}
	}

	const onboardingSteps = [
		{
			title: "Add Your First Contacts",
			description: "Import or manually create your contacts list to start building your customer database.",
			icon: "👥",
			action: "Add Contacts",
			href: "/dashboard/contacts",
			completed: contacts.length > 0,
			isExternal: true
		},
		{
			title: "Create Your First Campaign",
			description: "Let AI help you draft your first email campaign and reach out to your contacts.",
			icon: "📧",
			action: "Create Campaign",
			href: "/dashboard/campaigns/create",
			completed: campaigns.length > 0,
			isExternal: true
		},
		{
			title: "Explore Your Dashboard",
			description: "See your data in one place as it grows and track your campaign performance.",
			icon: "📊",
			action: "View Dashboard",
			href: "/dashboard",
			completed: false,
			isExternal: false
		}
	]

	useEffect(() => {
		fetchData()
	}, [])

	useEffect(() => {
		if (searchParams.get("onboarding") === "true") {
			setOnboarding(true)
			setOnboardingDismissed(false) // Reset dismissal when explicitly requesting onboarding
		} else if (searchParams.get("onboarding") === null && onboarding) {
			// If there's no onboarding parameter and onboarding was previously shown,
			// user clicked Dashboard link to dismiss it
			setOnboarding(false)
			setOnboardingDismissed(true)
		}
	}, [searchParams, onboarding])

	if (loading) return <div className='p-8 text-white'>Loading...</div>

	const showOnboarding = onboarding || (!onboardingDismissed && contacts.length === 0 && campaigns.length === 0)

	return (
		<main className='min-h-screen pt-24 px-6 text-white'>
			<div className='max-w-5xl mx-auto'>
				<h1 className='text-3xl font-bold mb-6'>Dashboard</h1>

				{showOnboarding ? (
					<div className='glass-effect p-8 rounded-xl'>
						{/* Header with close button */}
						<div className='flex justify-between items-start mb-6'>
							<div className='text-center flex-1'>
								<h2 className='text-3xl font-bold mb-2'>🎉 Welcome to AI CRM!</h2>
								<p className='text-white/70 text-lg'>
									Let's get you set up in just a few steps
								</p>
							</div>
							<button 
								onClick={handleSkipOnboarding}
								className='text-white/60 hover:text-white/80 transition-colors p-2 rounded-lg hover:bg-white/10'
								title='Skip onboarding'
							>
								<svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
									<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
								</svg>
							</button>
						</div>

						{/* Progress indicator */}
						<div className='flex justify-center mb-8'>
							<div className='flex space-x-2'>
								{onboardingSteps.map((step, index) => (
									<div 
										key={index}
										className={`w-3 h-3 rounded-full transition-colors ${
											step.completed ? 'bg-green-500' : 'bg-white/30'
										}`}
									/>
								))}
							</div>
						</div>

						{/* Onboarding cards */}
						<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
							{onboardingSteps.map((step, index) => (
								<div key={index} className='relative'>
									<div className={`feature-item p-6 h-full flex flex-col transition-all duration-300 ${
										step.completed ? 'ring-2 ring-green-500/50 bg-green-500/10' : 'hover:shadow-lg hover:scale-105'
									}`}>
										{/* Completion badge */}
										{step.completed && (
											<div className='absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold'>
												✓
											</div>
										)}
										
										{/* Icon */}
										<div className='text-4xl mb-4 text-center'>{step.icon}</div>
										
										{/* Content */}
										<div className='flex-1'>
											<h3 className='font-bold text-xl mb-3 text-center'>{step.title}</h3>
											<p className='text-white/70 text-sm text-center mb-6'>
												{step.description}
											</p>
										</div>
										
										{/* Action button */}
										<div className='mt-auto'>
											{step.isExternal ? (
												<Link href={step.href} className='block'>
													<button className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${
														step.completed
															? 'bg-green-600 hover:bg-green-700 text-white'
															: 'btn-primary hover:scale-105'
													}`}>
														{step.completed ? 'Completed ✓' : step.action}
													</button>
												</Link>
											) : (
												<button
													onClick={() => handleStepAction(step)}
													className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${
														step.completed
															? 'bg-green-600 hover:bg-green-700 text-white'
															: 'btn-primary hover:scale-105'
													}`}
												>
													{step.completed ? 'Completed ✓' : step.action}
												</button>
											)}
										</div>
									</div>
								</div>
							))}
						</div>

						{/* Footer */}
						<div className='mt-8 text-center'>
							<p className='text-white/60 text-sm mb-4'>
								Complete all steps to unlock the full potential of your AI CRM
							</p>
							<button 
								onClick={handleSkipOnboarding}
								className='text-white/60 hover:text-white/80 underline text-sm transition-colors'
							>
								Skip onboarding and go to dashboard
							</button>
						</div>
					</div>
				) : (
					<>
						{/* Contact Table */}
						<section className='mb-12'>
							<div className='flex justify-between items-center mb-4'>
								<h2 className='text-2xl font-semibold'>Contacts</h2>
								<Link href='/dashboard/contacts' className='text-blue-400 hover:underline text-sm'>
									View All
								</Link>
							</div>
							<div className='bg-white/5 border border-white/10 rounded-xl p-4'>
								{contacts.length === 0 ? (
									<p className='text-white/60'>No contacts yet.</p>
								) : (
									<ul className='divide-y divide-white/10 text-sm'>
										{contacts.slice(0, 5).map((c) => (
											<li key={c.id} className='py-2 flex justify-between'>
												<span>
													{c.first_name} {c.last_name}
												</span>
												<span className='text-white/60'>{c.email}</span>
											</li>
										))}
									</ul>
								)}
							</div>
						</section>

						{/* Campaign Table */}
						<section>
							<div className='flex justify-between items-center mb-4'>
								<h2 className='text-2xl font-semibold'>Campaigns</h2>
								<Link href='/dashboard/campaigns' className='text-blue-400 hover:underline text-sm'>
									View All
								</Link>
							</div>
							<div className='bg-white/5 border border-white/10 rounded-xl p-4'>
								{campaigns.length === 0 ? (
									<p className='text-white/60'>No campaigns created yet.</p>
								) : (
									<ul className='divide-y divide-white/10 text-sm'>
										{campaigns.slice(0, 5).map((c) => (
											<li key={c.id} className='py-2'>
												<div className='font-semibold'>{c.title}</div>
												<div className='text-white/60'>{c.subject}</div>
											</li>
										))}
									</ul>
								)}
							</div>
						</section>
					</>
				)}
			</div>
		</main>
	)
}
