import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const fetchCandidates = async () => {
      const data = await searchGithub();
      setCandidates(data);
      if (data.length > 0) {
        void fetchCandidateDetails(data[0].login);
      }
    };
    void fetchCandidates();
  }, []);

  const fetchCandidateDetails = async (username: string) => {
    const details = await searchGithubUser(username);
    setCurrentCandidate(details);
  };

  const handleNextCandidate = () => {
    if (currentIndex < candidates.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      void fetchCandidateDetails(candidates[nextIndex].login);
    }
  };

  const handleSaveCandidate = () => {
    if (currentCandidate) {
      const newSavedCandidates = [...savedCandidates, currentCandidate];
      setSavedCandidates(newSavedCandidates);
      localStorage.setItem('savedCandidates', JSON.stringify(newSavedCandidates));
      handleNextCandidate();
    }
  };

  return (
    <div className="candidate-card">
      {currentCandidate ? (
        <div>
          <img src={currentCandidate.avatar_url} alt={currentCandidate.login} />
          <h2>{currentCandidate.login}</h2>
          <p>Location: {currentCandidate.location ?? 'N/A'}</p>
          <p>Email: {currentCandidate.email ?? 'N/A'}</p>
          <p>Company: {currentCandidate.company ?? 'N/A'}</p>
          <p>Bio: {currentCandidate.bio ?? 'N/A'}</p>
          <button onClick={handleNextCandidate}>-</button>
          <button onClick={handleSaveCandidate}>+</button>
      
        </div>
      ) : (
        <p>Loading candidate...</p>
      )}
    </div>
  );
};

export default CandidateSearch;
