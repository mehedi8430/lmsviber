import { getLoggedInUser } from "@/lib/loggedin-user";
import ChangePassword from "../component/change-password";
import ContactInfo from "../component/contact-info";
import PersonalDetails from "../component/personal-details";

async function Profile() {
	const loggedinUser = await getLoggedInUser();

	return (
		<>
			<PersonalDetails userInfo={loggedinUser} />
			<div className="p-6 rounded-md mt-[30px] shadow-md bg-[rgba(144,137,252,0.2)] ">
				<div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
					<ContactInfo />
					<ChangePassword email={loggedinUser?.email} />
				</div>
			</div>
		</>
	);
}

export default Profile;
