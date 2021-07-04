using MediatR;
using Microsoft.AspNet.OData;
using Microsoft.AspNetCore.Mvc;
using Microsoft.DSX.ProjectTemplate.Command.Group;
using Microsoft.DSX.ProjectTemplate.Data.DTOs;
using System.Linq;
using System.Threading.Tasks;

namespace Microsoft.DSX.ProjectTemplate.API.Controllers
{
    /// <summary>
    /// Controller for Group APIs.
    /// </summary>
    [Route("odata/groups")]
    public class GroupsODataController : ODataController
    {
        private IMediator Mediator;

        /// <summary>
        /// Initializes a new instance of the <see cref="GroupsODataController"/> class.
        /// </summary>
        /// <param name="mediator">Mediator instance from dependency injection.</param>
        public GroupsODataController(IMediator mediator) 
        {
            Mediator = mediator;
        }

        /// <summary>
        /// Get all Groups.
        /// </summary>
        [HttpGet]
        [EnableQuery]
        public async Task<ActionResult<IQueryable<GroupDto>>> Get()
        {
            return Ok((await Mediator.Send(new GetAllGroupsQuery())).AsQueryable());
        }
    }
}
