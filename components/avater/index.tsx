import { useSession } from "next-auth/react";

interface IAvatarProps {
  large?: boolean;
  url: string;
  small?: boolean;
}

const Avatar = ({ large = false, url, small = false }: IAvatarProps) => {
  return (
    <div className="rounded-full bg-white overflow-hidden">
      <img
        className={`rounded-full ${
          large ? "w-20 h-20" : small ? "w-10 h-10" : "w-15 h-12"
        }`}
        src={url}
        alt="avatar"
      />
    </div>
  );
};

export default Avatar;
