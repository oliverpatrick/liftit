import { Pen } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Form, FormDrawer, Input } from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';
import { useUser } from '@/lib/auth';

import {
  updateProfileInputSchema,
  useUpdateProfile,
} from '../api/update-profile';

export const UpdateProfile = () => {
  const user = useUser();
  const { addNotification } = useNotifications();
  const updateProfileMutation = useUpdateProfile({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'Profile Updated',
        });
      },
    },
  });

  return (
    <FormDrawer
      isDone={updateProfileMutation.isSuccess}
      triggerButton={
        <Button icon={<Pen className="size-4" />} size="sm">
          Update Profile
        </Button>
      }
      title="Update Profile"
      submitButton={
        <Button
          form="update-profile"
          type="submit"
          size="sm"
          isLoading={updateProfileMutation.isPending}
        >
          Submit
        </Button>
      }
    >
      <Form
        id="update-profile"
        onSubmit={(values) => {
          updateProfileMutation.mutate({ data: values });
        }}
        options={{
          defaultValues: {
            name: user.data?.name ?? '',
            email: user.data?.email ?? '',
          },
        }}
        schema={updateProfileInputSchema}
      >
        {({ register, formState }) => (
          <>
            <Input
              label="Name"
              error={formState.errors['name']}
              registration={register('name')}
            />
            <Input
              label="Email Address"
              type="email"
              error={formState.errors['email']}
              registration={register('email')}
            />
          </>
        )}
      </Form>
    </FormDrawer>
  );
};
