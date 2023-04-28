const { sequelize } = require("./sequelize");
const Film = require("./models/film");
const Category = require("./models/category");
const Store = require("./models/store");
const Staff = require("./models/staff");
const Film_category = require("./models/film_category");
const Customer = require("./models/customer");
const Address = require("./models/address");
const Payment = require("./models/payment");
const Country = require("./models/country");
const City = require("./models/city");
const Rental = require("./models/rental");
const Actor = require("./models/actor");
const Film_actor = require("./models/film_actor");

sequelize.sync({ force: false }).then(console.log("Successful !!"));

const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

app.use(bodyParser.json());

//                               Tìm top 10 bộ phim có rating cao nhất
async function top10() {
  const data = await Film.findAll({
    where: {},
    attributes: ["film_id", "title", "rental_rate"],
    order: [["rental_rate", "DESC"]],
    limit: 10,
  });
  console.log(data);
  return data;
}

//                                    List tất cả thể loại phim
async function FilmCategory() {
  const data = await Category.findAll({
    attributes: ["name"],
    distinct: true,
  });
  console.log(data);
  return data;
}

//                             Lấy tất cả thể loại phim và số phim của từng thể loại
async function FilmsEachCategory() {
  const categoryList = await Category.findAll();
  for (const category of categoryList) {
    const count = await Film_category.count({
      where: { category_id: category.category_id },
    });
    category.countFilm = count;
  }
  console.log(categoryList);
  return categoryList;
}

//                           Lây họ tên khách hàng vẫn còn hoạt động và địa chỉ cụ thể của họ
async function activeCustomerAddress() {
  const activeCustomer = await Customer.findAll({
    where: { active: 1 },
    attributes: ["first_name", "last_name", "address_id"],
  });
  for (const customer of activeCustomer) {
    const address = await Address.findAll({
      attributes: ["address"],
      where: { address_id: customer.address_id },
    });
    customer.address = address;
  }
  console.log(activeCustomer);
  return activeCustomer;
}

//                                  Lây danh sách diễn viên của phim có rating cao nhất
async function actorsOfHighestRatingFilm() {
  const highestRatingFilm = await Film.findOne({
    attributes: ["film_id", "title"],
    order: [["rental_rate", "DESC"]],
  });
  console.log(highestRatingFilm);
  const actorsId = await Film_actor.findAll({
    where: { film_id: highestRatingFilm.film_id },
    attributes: ["actor_id"],
  });
  console.log(actorsId);
  const list = [];
  for (const id of actorsId) {
    list.push(id.actor_id);
  }
  const actor = await Actor.findAll({
    where: { actor_id: list },
    attributes: ["first_name", "last_name"],
  });
  highestRatingFilm.actor = actor;
  console.log(highestRatingFilm);
  return highestRatingFilm;
}

//                                 Lấy danh sách phim có năm phát hành là 2020
async function Film2020() {
  const data = await Film.findAll({
    where: { release_year: 2020 },
    attributes: ["title"],
  });
  console.log(data);
  return data;
}

//                                     Lấy danh sách cửa hàng và họ tên người quản lý
async function StoreManager() {
  const data = await Store.findAll();
  for (const store of data) {
    const manager_staff = await Staff.findByPk(store.manager_staff_id);
    store.manager = manager_staff;
  }
  console.log(data);
  return data;
}

//                              Lấy tên nhân viên, tên khách hàng, ngày trả đĩa của các giao dịch
async function detailTransaction() {
  const rentals = await Rental.findAll({
    attributes: ["rental_id", "customer_id", "staff_id", "return_date"],
  });
  for (const rental of rentals) {
    const customers = await Customer.findAll({
      attributes: ["first_name"],
      where: { customer_id: rental.customer_id },
    });
    rental.customer = customers;
  }
  for (const rental of rentals) {
    const staffs = await Staff.findAll({
      attributes: ["first_name"],
      where: { staff_id: rental.staff_id },
    });
    rental.staff = staffs;
  }
  console.log(rentals);
  return rentals;
}

//                                          Lấy 10 phim có ngôn ngữ tiếng anh
async function EnglishFilm() {
  const data = await Film.findAll({
    where: { language_id: 1 },
    attributes: ["title"],
    order: [["film_id", "ASC"]],
    limit: 10,
  });
  console.log(data);
  return data;
}

//                                       List nhân viên và tổng doanh thu của họ
async function staffRevenue() {
  const staffs = await Staff.findAll({
    attributes: ["first_name", "staff_id"],
  });
  for (const staff of staffs) {
    const rev = await Payment.sum("amount", {
      where: { staff_id: staff.staff_id },
    });
    staff.revenue = rev;
  }
  console.log(staffs);
  return staffs;
  // const Revenue = await Payment.findAll({
  //   //where: { staff_id: staff.staff_id },
  //   attributes: [
  //     "staff_id",
  //     [sequelize.fn("sum", sequelize.col("amount")), "s"],
  //   ],
  //   group: ["staff_id"],
  // });
  // console.log(Revenue);
}

//                    Liên kết địa chỉ với thành phố và quốc gia sắp xếp theo tên quốc gia (a -> z)
async function fullAddress() {
  const countrys = await Country.findAll({
    attributes: ["country", "country_id"],
    order: [["country", "ASC"]],
  });
  for (const country of countrys) {
    const cities = await City.findAll({
      attributes: ["city", "country_id"],
      order: [["city", "ASC"]],
      where: { country_id: country.country_id },
    });
    country.cities = cities;
  }
  console.log(countrys);
  return countrys;
}

//                                  Lấy danh sách nhân sự và cửa hàng họ đang làm việc
async function storeStaff() {
  const stores = await Store.findAll({
    attributes: ["store_id"],
  });
  for (const store of stores) {
    const listStaff = await Staff.findAll({
      where: { store_id: store.store_id },
    });
    store.staffs = listStaff;
  }
  console.log(stores);
  return stores;
}

//                              Thêm một bộ phim mới có tên là John Wick 4 :) dữ liệu tự chọn
async function insertFilm() {
  const newFilm = await Film.create({
    title: "John Wick 4",
    description:
      "John Wick (Keanu Reeves) khám phá ra con đường đánh bại High Table. Nhưng trước khi có thể kiếm được tự do, Bấc phải đối đầu với một kẻ thù mới với các liên minh hùng mạnh trên toàn cầu và các thế lực biến bạn cũ thành thù",
    release_year: 2023,
    language_id: 1,
    rental_duration: 5,
    rental_rate: 4.99,
    length: 169,
    replacement_cost: 12.99,
    rating: "R",
    last_update: new Date(),
    special_features: ["trailers"],
    fulltext: "fulltext",
  });
  return newFilm;
}
//                                    thay đổi thông tin phim từ JohnWick 4 thành Shazam 2
async function updateFilm() {
  const updatedFilm = Film.update(
    {
      title: "Shazam 2",
      description:
        "Two years after Thaddeus Sivans s defeat,[a] Hespera and Kalypso, two of the daughters of the Titan Atlas, break into the Acropolis Museum in Athens, Greece to steal the Wizard s broken staff.[b] They take it to the Wizard, imprisoned in the Gods Realm, and force him to repair the staff and reactivate its powers.",
      length: 130,
      replacement_cost: 12.99,
      rating: "PG-13",
    },
    {
      where: {
        title: "John Wick 4",
      },
    }
  );
}
//                                                xóa phim vừa thêm
async function deleteFilm() {
  await Film.destroy({
    where: {
      title: "Shazam 2",
    },
  });
}

//                               Tìm top 10 bộ phim có rating cao nhất
app.get("/top-10-film-by-rate", async function (req, res) {
  const response = await top10();
  return res.json(response);
});

//                                    List tất cả thể loại phim
app.get("/all-category", async function (req, res) {
  const response = await FilmCategory();
  return res.json(response);
});

//                             Lấy tất cả thể loại phim và số phim của từng thể loại
app.get("/quantity-films-of-each-category", async function (req, res) {
  const response = await FilmsEachCategory();
  return res.json(response);
});

//                           Lây họ tên khách hàng vẫn còn hoạt động và địa chỉ cụ thể của họ
app.get("/address-of-active-customer", async function (req, res) {
  const response = await activeCustomerAddress();
  return res.json(response);
});

//                                  Lây danh sách diễn viên của phim có rating cao nhất
app.get("/actors-of-highest-rating-film", async function (req, res) {
  const response = await actorsOfHighestRatingFilm();
  return res.json(response);
});

//                                 Lấy danh sách phim có năm phát hành là 2020
app.get("/films-relaesed-in-2020", async function (req, res) {
  const response = await Film2020();
  return res.json(response);
});

//                                     Lấy danh sách cửa hàng và họ tên người quản lý
app.get("/managers-and-stores", async function (req, res) {
  const response = await StoreManager();
  return res.json(response);
});

//                              Lấy tên nhân viên, tên khách hàng, ngày trả đĩa của các giao dịch
app.get("/rental-details", async function (req, res) {
  const response = await detailTransaction();
  return res.json(response);
});

//                                          Lấy 10 phim có ngôn ngữ tiếng anh
app.get("/english-films", async function (req, res) {
  const response = await EnglishFilm();
  return res.json(response);
});

//                                       List nhân viên và tổng doanh thu của họ
app.get("/staff-revenue", async function (req, res) {
  const response = await staffRevenue();
  return res.json(response);
});

//                    Liên kết địa chỉ với thành phố và quốc gia sắp xếp theo tên quốc gia (a -> z)
app.get("/full-address", async function (req, res) {
  const response = await fullAddress();
  return res.json(response);
});

//                                  Lấy danh sách nhân sự và cửa hàng họ đang làm việc
app.get("/staffs-of-store", async function (req, res) {
  const response = await storeStaff();
  return res.json(response);
});

app.post("/film", async (req, res) => {
  try {
    const body = req.body;

    const newFilm = await Film.create(body);

    return res.status(200).json(newFilm);
  } catch (err) {
    return res.status(400).json({ error: err });
  }
});

app.delete("/delete-film/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Film.destroy({
      where: {
        film_id: id,
      },
    });
    return res.status(200).json({ message: "dad" });
  } catch (err) {
    return res.status(400).json({ error: err });
  }
});

app.put("/update-film/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const updatedFilm = await Film.update(body, {
      where: {
        film_id: id,
      },
    });
    const pk = await Film.findByPk(id);

    return res.status(200).json(pk);
  } catch (error) {}
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
