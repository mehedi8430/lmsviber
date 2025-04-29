"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

import { MobileNav } from "@/components/mobile-nav";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button, buttonVariants } from "./ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export function MainNav({ items, children }) {
	const { data: session } = useSession();

	const [showMobileMenu, setShowMobileMenu] = useState(false);
	const [loginSession, setLoginSession] = useState(null);
	const [loggedInUser, setLoggedInUser] = useState(null);

	if (session?.error === "RefreshAccessTokenError") {
		redirect("/login");
	}

	useEffect(() => {
		setLoginSession(session);
		async function fetchMe() {
			try {
				const response = await fetch("/api/me");
				const data = await response.json();
				setLoggedInUser(data);
			} catch (err) {
				console.log(err);
			}
		}

		fetchMe();
	}, [session]);

	return (
		<>
			<Link href="/">
				<Logo />
			</Link>

			{/* Nav Menu */}
			<div className="flex gap-6 lg:gap-10 ml-[-120px]">
				{
					items?.length ? (
						<nav className="hidden gap-6 lg:flex">
							{
								items?.map((item, index) => (
									<Link
										key={index}
										href={item.disabled ? "#" : item.href}
										className={cn(
											"flex items-center text-xl font-medium transition-colors hover:text-foreground/80 sm:text-sm"
										)}
									>
										{item.title}
									</Link>
								))
							}
						</nav>
					) : null
				}

				{
					showMobileMenu && items && (
						<MobileNav items={items}>{children}</MobileNav>
					)
				}
			</div>

			{/* Right Menu */}
			<nav className="flex items-center gap-3">
				{
					!loginSession && (
						<div className="items-center gap-3 hidden lg:flex">
							<Link
								href="/login"
								className={cn(
									buttonVariants({ size: "sm" }),
									"px-4 bg-custom hover:bg-customHover"
								)}
							>
								Login
							</Link>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="outline" className="border border-custom hover:bg-custom hover:text-white" size="sm">
										Register
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent
									align="end"
									className="w-56 mt-4"
								>
									<DropdownMenuItem className="cursor-pointer">
										<Link href="/register/student">
											Student
										</Link>
									</DropdownMenuItem>
									<DropdownMenuItem className="cursor-pointer">
										<Link href="/register/instructor">
											Instructor
										</Link>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					)
				}
				<DropdownMenu>
					{
						loggedInUser && (
							<DropdownMenuTrigger asChild>
								<div className="cursor-pointer">
									<Avatar>
										<AvatarImage
											src={loggedInUser?.profilePicture}
											alt="@shadcn"
										/>
										<AvatarFallback>{loggedInUser?.firstName.charAt(0)}</AvatarFallback>
									</Avatar>
								</div>
							</DropdownMenuTrigger>
						)
					}

					<DropdownMenuContent align="end" className="w-56 mt-4">
						<DropdownMenuItem className="cursor-pointer" asChild>
							<Link href="/account">Profile</Link>
						</DropdownMenuItem>
						{
							loggedInUser?.role === "instructor" && (
								<DropdownMenuItem
									className="cursor-pointer"
									asChild
								>
									<Link href="/dashboard">Dashboard</Link>
								</DropdownMenuItem>
							)
						}
						<DropdownMenuItem className="cursor-pointer" asChild>
							<Link href="/account/enrolled-courses">
								My Courses
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem className="cursor-pointer" asChild>
							<Link href="">Testimonials & Certificates</Link>
						</DropdownMenuItem>
						{loginSession && (
							<DropdownMenuItem
								className="cursor-pointer"
								asChild
							>
								<Link
									href="#"
									onClick={() => {
										signOut();
									}}
								>
									Logout
								</Link>
							</DropdownMenuItem>
						)}
					</DropdownMenuContent>
				</DropdownMenu>
				<button
					className="flex items-center space-x-2 lg:hidden"
					onClick={() => setShowMobileMenu(!showMobileMenu)}
				>
					{showMobileMenu ? <X /> : <Menu />}
				</button>
			</nav>
		</>
	);
}
