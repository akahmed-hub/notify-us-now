import Header from "@/components/Header";
import MyInterests from "@/components/MyInterests";

const Profile = () => {
  return (
    <div className="min-h-screen bg-surface">
      <Header />
      
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Profile</h1>
            <p className="text-muted-foreground">
              Manage your investment interests and preferences
            </p>
          </div>
          
          <MyInterests />
        </div>
      </main>
    </div>
  );
};

export default Profile;