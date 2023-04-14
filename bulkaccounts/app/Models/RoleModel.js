const mongoose = require("mongoose");

//---------------------------------Permission Schema---------------------------------//
const PermissionSchema = new mongoose.Schema({
  // roleId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Role",
  // },
  roleId: {
    type: String,
    required: true,
  },

  users: {
    create: Boolean,
    default: false, 
    read: Boolean,
    default: false,
    update: Boolean,
    default: false,
    delete: Boolean,
    default: false,
  },
  role: {
    create: Boolean,
    default: false,
    read: Boolean,
    default: false,
    update: Boolean,
    default: false,
    delete: Boolean,
    default: false,
  },
  permission: {
    create: Boolean,
    default: false,
    read: Boolean,
    default: false,
    update: Boolean,
    default: false,
    delete: Boolean,
    default: false,
  },
  page: {
    create: Boolean,
    default: false,
    read: Boolean,
    default: false,
    update: Boolean,
    default: false,
    delete: Boolean,
    default: false,
  },
  blogs: {
    create: Boolean,
    default: false,
    read: Boolean,
    update: Boolean,
    default: false,
    delete: Boolean,
    default: false,
  },
  blogs_cate: {
    create: Boolean,
    default: false,
    read: Boolean,
    update: Boolean,
    default: false,
    delete: Boolean,
    default: false,
  },
  product: {
    create: Boolean,
    default: false,
    read: Boolean,
    update: Boolean,
    default: false,
    delete: Boolean,
    default: false,
  },
  product_cate: {
    create: Boolean,
    default: false,
    read: Boolean,
    update: Boolean,
    default: false,
    delete: Boolean,
    default: false,
  },
  coupon: {
    create: Boolean,
    default: false,
    read: Boolean,
    update: Boolean,
    default: false,
    delete: Boolean,
    default: false,
  },
  ticket: {
    create: Boolean,
    default: false,
    read: Boolean,
    update: Boolean,
    default: false,
    delete: Boolean,
    default: false,
  },
  faq: {
    create: Boolean,
    default: false,
    read: Boolean,
    update: Boolean,
    default: false,
    delete: Boolean,
    default: false,
  },
  faq_cate: {
    create: Boolean,
    default: false,
    read: Boolean,
    update: Boolean,
    default: false,
    delete: Boolean,
    default: false,
  },
  orders: {
    create: Boolean,
    default: false,
    read: Boolean,
    update: Boolean,
    default: false,
    delete: Boolean,
    default: false,
  },
});
 
const permission = mongoose.models.Permission || mongoose.model('Permission', PermissionSchema); 

PermissionSchema.methods.toJSON = function () {
  return {
    id: this._id,
    users: this.users,
  };
};

// ---------------------------------Role Schema---------------------------------//
var roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: false,
    },
    status:{type: Number,
      enum: [1, 2],
      default:1
    },
    permissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Permission",
      },
    ],
  },
  {
    timestamps: true,
  }
);


const role =  mongoose.models.Role || mongoose.model('Role', roleSchema); 

module.exports = { role, permission };
