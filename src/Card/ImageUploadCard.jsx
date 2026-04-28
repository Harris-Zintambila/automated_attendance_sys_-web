import ImageUploadCard from "./ImageUploadCard";

function Card() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Other cards */}
        <div className="col-span-2 bg-white p-6 rounded-xl shadow-sm">
          Analytics Content
        </div>

        {/* Upload Card */}
        <ImageUploadCard />

      </div>
    </div>
  );
}