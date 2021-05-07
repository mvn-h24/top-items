db = db.getSiblingDB('top_items_app_db');
db.createUser(
  {
    user: "top_items_app",
    pwd: "top_items_app_password",
    roles: [
      {
        role: "readWrite",
        db: "top_items_app_db"
      }
    ]
  }
);
