import React, {useState} from "react";
import Image from "next/image";

interface Credential {
  id: number;
  website: string;
  username: string;
  password: string;
}

interface CredentialListProps {
  credentials: Credential[];
}

const CredentialList: React.FC<CredentialListProps> = ({ credentials }) => {
  return(
    <div className="mt-8">
      <h2 className="text-2x1 font-bold mb-4"> Saved Credentials</h2>
      <ul className="space-y-4">
        {credentials.map((credential) => {
          const [showPassword, setShowPassword] = useState(false);
          const handleCopy = (text: string) => {
            navigator.clipboard.writeText(text).then(() => {
              alert('Copied to clipboard!');
            }).catch((err) => {
              alert('Failed to copy!');
              console.error(err);
            });
          };

          return (
            <li key={credential.id} className="bg-white p-4 rounded-md shadow">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center">
                  <strong className="mr-2">Website:</strong>
                  {credential.website}
                  <a href={credential.website} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-500 underline">
                    <Image src="/img/link.svg" alt="Link" width={20} height={20} className="ml-1" priority={false}/>
                  </a>
                </div>
                <div className="flex items-center">
                  <strong className="mr-2">Username:</strong>
                  <span className="flex items-center">
                    {credential.username}
                    <button onClick={() => handleCopy(credential.username)} className="ml-1" >
                      <Image src="/img/copy.svg" alt="Copy Username" width={24} height={24} className="hover:opacity-80 cursor-pointer" priority={false}/>
                    </button>
                  </span>
                </div>
                <div className="flex items-center">
                  <strong className="mr-2">Password:</strong>
                  <span className="flex items-center">
                    {showPassword ? credential.password : credential.password.split('').map(() => <span className="password-dot">*</span>)}
                    <button onClick={() => handleCopy(credential.password)} className="ml-1">
                      <Image src="/img/copy.svg" alt="Copy Password" width={24} height={24} className="hover:opacity-80 cursor-pointer" priority={false}/>
                    </button>
                    <button onClick={() => setShowPassword(!showPassword)} className="ml-1">
                      <Image src="/img/eye.svg" alt="Reveal Password" width={24} height={24} className="hover:opacity-80 cursor-pointer" priority={false}/>
                    </button>
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default CredentialList;