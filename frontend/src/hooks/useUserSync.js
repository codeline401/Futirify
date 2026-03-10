import { useUser, useAuth } from "@clerk/react";
import { useMutation } from "@tanstack/react-query"; // Import useMutation from react-query to handle the user synchronization process with the backend API
import { useEffect } from "react";
import { syncUser } from "../lib/api";

function useUserSync() {
  const { isSignedIn } = useAuth(); // Check if the user is signed in
  const { user } = useUser(); // Get the user object from Clerk

  const {
    mutate: synUserMutation,
    isPending,
    isSuccess,
  } = useMutation({ mutationFn: syncUser }); // Sync user data with the backend when the user is signed in

  useEffect(() => {
    if (isSignedIn && user && !isPending && !isSuccess) {
      // Only sync if the user is signed in, user data is available, and there isn't already a pending or successful sync
      synUserMutation({
        email: user.primaryEmailAddress.emailAddress,
        name: user.fullName || user.firstName,
        imageUrl: user.imageUrl,
      });
    }
  }, [isSignedIn, user, synUserMutation, isPending, isSuccess]);
  return { isSynced: isSuccess }; // Return whether the user data has been successfully synced with the backend
}

export default useUserSync;
