import prisma from "../config/db.js";

export const getProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(req.user.id) },
      select: {
        id: true,
        email: true,
        name: true,
        age: true,
        gender: true,
        weight: true,
        height: true,
        activityLevel: true,
        goal: true,
        allergies: true, // array
        dietType: true,
        profileCompleted: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching profile" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const {
      age,
      gender,
      weight,
      height,
      activityLevel,
      goal,
      allergies,
      dietType,
    } = req.body;

    console.log("Update Profile Request - User:", req.user);
    console.log("Update Profile Request - Body:", req.body);

    const updatedUser = await prisma.user.update({
      where: { id: Number(req.user.id) },
      data: {
        age: age ? Number(age) : null,
        gender,
        weight: weight ? Number(weight) : null,
        height: height ? Number(height) : null,
        activityLevel,
        goal,
        allergies: Array.isArray(allergies) ? allergies : [],
        dietType,
        profileCompleted: true,
      },
    });

    res.json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating profile" });
  }
};
