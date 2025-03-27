import { useState, useEffect } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('savedCandidates');
    if (saved) {
      const parsed = JSON.parse(saved) as Candidate[];
      setSavedCandidates(parsed);
    }
  }, []);

  return (
    <div>
      <h1>Potential Candidates</h1>
      {savedCandidates.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Location</th>
              <th>Email</th>
              <th>Company</th>
              <th>Bio</th>
            </tr>
          </thead>
          <tbody>
            {savedCandidates.map((candidate) => (
              <tr key={candidate.login}>
                <td>
                  <img
                    src={candidate.avatar_url}
                    alt={candidate.login}
                    width="50"
                    height="50"
                    style={{ borderRadius: '50%' }}
                  />
                </td>
                <td>{candidate.login}</td>
                <td>{candidate.location ?? 'N/A'}</td>
                <td>{candidate.email ?? 'N/A'}</td>
                <td>{candidate.company ?? 'N/A'}</td>
                <td>{candidate.bio ?? 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No saved candidates</p>
      )}
    </div>
  );
}  

export default SavedCandidates;
