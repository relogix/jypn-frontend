import { motion } from "framer-motion";

const Profile = ({ data, direction = 1 }) => {
  const row = [
    { column: "Full Name", value: data?.attributes?.fullName },
    { column: "Korean Name", value: data?.attributes?.koreanName },
    { column: "Birth Date", value: data?.attributes?.birthday },
    { column: "Birth Place", value: data?.attributes?.birthPlace },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: -20 * direction }} animate={{ opacity: 1, y: 0 }}>
      <table>
        <tbody className="text-gray-700">
          {row.map((item, iItem) => (
            <tr key={iItem}>
              <td className="p-1 pr-8 font-semibold">{item.column}</td>
              <td className="p-1">{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default Profile;
