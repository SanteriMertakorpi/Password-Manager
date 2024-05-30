import Layout from "@/components/Layout";
import React, {useState} from "react";
import CredentialForm from "@/components/CredentialForm";
import CredentialList from "@/components/CredentialList";
import SearchBar from "@/components/SearchBar";

interface Credential {
  id: number;
  website: string;
  username: string;
  password: string;
}

const Home: React.FC = () => {
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const addCredential = (data: Omit<Credential, 'id'>) => {
    const newCredential = {...data, id: Date.now() };
    setCredentials([...credentials, newCredential]);
  };

  const filteredCredentials = credentials.filter((credential) =>
    credential.website.toLowerCase().includes(searchQuery.toLowerCase()) ||
    credential.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return(
    <Layout>
      <h1 className="text-4x1 font-bold mb-8">Password Manager dashboard</h1>
      <CredentialForm onSubmit={addCredential} />
      <SearchBar onSearch={setSearchQuery} />
      <CredentialList credentials={filteredCredentials} />
    </Layout>
  );
};

export default Home;