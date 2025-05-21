import {
	Anchor,
	Button,
	Checkbox,
	Container,
	Divider,
	Group,
	Paper,
	PasswordInput,
	Text,
	TextInput,
	Title,
} from "@mantine/core";
import classes from "@/styles/login.module.css"; // Adjust the path to your CSS module
import { useForm } from "@mantine/form";
import { createClient } from '@/utils/supabase/component'
import { useRouter } from "next/router";

const Register = () => {
	const router = useRouter()
	const supabase = createClient()

	const form = useForm({
		mode: "uncontrolled",
		initialValues: {
			email: "munk.gorn@gmail.com",
			password: "123456",
		},
		validate: {
			email: (value) =>
				/^\S+@\S+$/.test(value) ? null : "Invalid email",
		},
	});
    
    const handleSubmit = async ({email, password}) => {
		const { error } = await supabase.auth.signUp({ email, password })
		if (error) {
		  console.error(error)
		}
		router.push('/')
        
    }

	return (
		<Container size={450} my={40}>
			<Paper withBorder shadow="sm" p={22} mt={30} radius="md">
				<form onSubmit={form.onSubmit(async (values) => await handleSubmit(values))}>
					<Title ta="center" className={classes.title}>
						Register
					</Title>
					<Divider my="lg" />
					<TextInput
						label="Email"
						placeholder="you@mantine.dev"
						required
						radius="md"
						autoFocus
						key={form.key("email")}
						{...form.getInputProps("email")}
					/>
					<PasswordInput
						label="Password"
						placeholder="Your password"
						required
						mt="md"
						radius="md"
						key={form.key("password")}
						{...form.getInputProps("password")}
					/>
					<Button fullWidth mt="xl" radius="md" type="submit">
						Sign in
					</Button>
				</form>
			</Paper>
		</Container>
	);
};

export default Register;
