import { ProfileForm } from './profile-form';

export default function ProfilePage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-headline font-bold text-primary">My Profile</h1>
          <p className="text-lg text-muted-foreground mt-2">Keep your information up-to-date for the community.</p>
        </header>
        <ProfileForm />
      </div>
    </div>
  );
}
