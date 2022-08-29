import { useSession } from "next-auth/react";

interface IAvatarProps {
  large?: boolean;
}

const Avatar = ({ large = false }: IAvatarProps) => {
  const { data: session } = useSession();
  return (
    <div className="rounded-full bg-white overflow-hidden">
      <img
        className={`rounded-full ${large ? "w-20 h-20" : "w-15 h-12"}`}
        src={`https://avatars.dicebear.com/api/human/${session?.user?.name}.svg`}
        alt="avatar"
      />
    </div>
  );
};

export default Avatar;
