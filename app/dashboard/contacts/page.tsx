"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/utils/supabaseClient"
import Papa from "papaparse"

type Contact = {
	id: string
	first_name: string
	last_name: string
	email: string
}

export default function ContactsPage() {
	const [contacts, setContacts] = useState<Contact[]>([])
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [email, setEmail] = useState("")
	const [loading, setLoading] = useState(false)

	const fetchContacts = async () => {
		const { data, error } = await supabase.from("contacts").select("*").order("created_at", { ascending: false })

		if (!error && data) setContacts(data)
	}

	const handleAdd = async () => {
		setLoading(true)
		const {
			data: { user },
		} = await supabase.auth.getUser()

		const { error } = await supabase.from("contacts").insert([
			{
				user_id: user?.id,
				first_name: firstName,
				last_name: lastName,
				email,
			},
		])

		if (!error) {
			setFirstName("")
			setLastName("")
			setEmail("")
			fetchContacts()
		} else {
			alert(error.message)
		}
		setLoading(false)
	}

	const handleCSVUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return

		Papa.parse(file, {
			header: true,
			skipEmptyLines: true,
			complete: async (results) => {
				const {
					data: { user },
				} = await supabase.auth.getUser()

				const rows = results.data as { first_name: string; last_name: string; email: string }[]

				// Filter out rows missing email
				const validContacts = rows
					.filter((row) => row.email)
					.map((row) => ({
						first_name: row.first_name || "",
						last_name: row.last_name || "",
						email: row.email,
						user_id: user?.id,
					}))

				const { error } = await supabase.from("contacts").insert(validContacts)

				if (error) {
					alert(`Error importing contacts: ${error.message}`)
				} else {
					alert(`Imported ${validContacts.length} contacts!`)
					fetchContacts()
				}
			},
			error: (error) => {
				alert(`CSV Parsing Error: ${error.message}`)
			},
		})
	}

	const confirmAndDelete = (id: string) => {
		if (confirm("Are you sure you want to delete this contact?")) {
			handleDelete(id)
		}
	}

	const handleDelete = async (id: string) => {
		const { error } = await supabase.from("contacts").delete().eq("id", id)
		if (!error) {
			setContacts((prev) => prev.filter((c) => c.id !== id))
		} else {
			alert("Failed to delete contact: " + error.message)
		}
	}

	useEffect(() => {
		fetchContacts()
	}, [])

	return (
		<div className='p-8 max-w-2xl mx-auto text-white'>
			<h1 className='text-3xl font-bold mb-6'>Your Contacts</h1>

			<div className='glass-effect p-6 rounded-xl mb-8'>
				<h2 className='text-xl font-semibold mb-4'>Add Contact</h2>
				<input
					className='w-full mb-3 p-3 rounded bg-white/10 border border-white/10 text-white placeholder-white/60'
					placeholder='First Name'
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
				/>
				<input
					className='w-full mb-4 p-3 rounded bg-white/10 border border-white/10 text-white placeholder-white/60'
					placeholder='Last Name'
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
				/>
				<input
					className='w-full mb-4 p-3 rounded bg-white/10 border border-white/10 text-white placeholder-white/60'
					placeholder='Email *'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<button
					onClick={handleAdd}
					className='btn-primary w-full py-3 rounded font-semibold text-lg'
					disabled={loading}
				>
					{loading ? "Saving..." : "Add Contact"}
				</button>
			</div>
			<div className='glass-effect p-6 rounded-xl mb-8'>
				<h2 className='text-xl font-semibold mb-4'>Import from CSV</h2>
				<input
					type='file'
					accept='.csv'
					onChange={handleCSVUpload}
					className='w-full py-2 px-4 rounded bg-white/10 border border-white/10 text-white cursor-pointer'
				/>
				<p className='text-sm text-white/50 mt-2'>
					Required columns: <code>first_name</code>, <code>last_name</code>, <code>email</code>
				</p>
			</div>

			<div>
				<h2 className='text-xl font-semibold mb-4'>Saved Contacts</h2>
				<ul className='space-y-3'>
					{contacts.map((c) => (
						<li key={c.id} className='p-4 feature-item flex justify-between items-center'>
							<div>
								<p className='font-semibold'>
									{c.first_name || ""} {c.last_name || ""}
								</p>
								<p className='text-white/60 text-sm'>{c.email}</p>
							</div>
							<button onClick={() => confirmAndDelete(c.id)} className='text-red-500 hover:underline text-sm'>
								Delete
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}
