import { defineStore } from "pinia";
import { ref } from "vue";
import { UserAggregate } from "@/core/domain/aggregates/UserAggregate";
import { UserRepositoryImp } from "@/core/adapter/UserRepositoryImp";
import { GetUser } from "@/core/port/appservices/user/GetUser";

export const useIamStore = defineStore("iamStore", () => {
	const user = ref<UserAggregate | null>(null);
	const loading = ref(false);
	const error = ref<string | null>(null);

	const fetchUser = async () => {
		if (user.value) return;
		loading.value = true;
		error.value = null;
		try {
			const userRepository = new UserRepositoryImp();
			const getUser = new GetUser(userRepository);
			user.value = await getUser.execute();
		} catch (err) {
			error.value = "Failed to fetch user";
		} finally {
			loading.value = false;
		}
	};
	const flushData = () => {
		user.value = null;
	};

	return {
		user,
		loading,
		error,
		fetchUser,
		flushData,
	};
});
