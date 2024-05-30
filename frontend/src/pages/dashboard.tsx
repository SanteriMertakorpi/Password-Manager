import { useEffect, useState } from "react";
import { fetchCredentials, addCredential } from "@/utils/api";
import CredentialList from "@/components/CredentialList";
import SearchBar from "@/components/SearchBar";
import Layout from "@/components/Layout";
import CredentialForm from "@/components/CredentialForm";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";

interface Credential {
  id: number;
  website: string;
  username: string;
  password: string;
}

interface CredentialFormInputs {
  website: string;
  username: string;
  password: string;
}

const DashboardPage: React.FC = () => {
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const { reset } = useForm<CredentialFormInputs>();


  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/auth');
      }
      try {
        const response = await fetchCredentials(token as string);
        setCredentials(response.data);
      } catch (err) {
        console.error('Error fetching credentials', err);
      }
    };
    fetchData();
  }, [router]);

  const onSubmit: SubmitHandler<CredentialFormInputs> = async (data) => {
    const token = localStorage.getItem('token');
    try {
      
      await addCredential(data, token as string);
      const response = await fetchCredentials(token as string);
      setCredentials(response.data);
      reset();
    } catch (err) {
      console.error('Error adding credential', err);
    }
  };
  const filteredCredentials = credentials.filter((credential) =>
    credential.website.toLowerCase().includes(searchQuery.toLowerCase()) ||
    credential.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return(
    <Layout title="Dashboard">
        <h1 className="text-4x1 font-bold mb-8">Password Manager dashboard</h1>
        <CredentialForm onSubmit={onSubmit}></CredentialForm>
        <SearchBar onSearch={setSearchQuery} />
        <CredentialList credentials={filteredCredentials} />
    </Layout>
    
  );
};

export default DashboardPage;