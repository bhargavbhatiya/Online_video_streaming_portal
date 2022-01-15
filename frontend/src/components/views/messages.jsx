
function Messages({ errors, success_msg, error_msg, error }) {

    if (typeof errors != 'undefined') {
        errors.forEach(function (error) {
            return <div className="alert alert-warning alert-dismissible fade show" role="alert">
                {error.msg}

                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        });
    }
    if (success_msg != '') {
        return <div className="alert alert-success alert-dismissible fade show" role="alert">
            {success_msg}
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    }
    if (error_msg != '') {
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
            {error_msg}
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    }
    if (error != '') {
        return <div className="alert alert-danger alert-dismissible fade show" role="alert">
            {error}
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    }
}

export default Messages;